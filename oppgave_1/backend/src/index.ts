import app from "./app";
import { port } from "./config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { PrismaClient } from '@prisma/client'
import { date, z } from "zod"

const postCourseSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  category: z.string(),
})

const patchCourseSchema = z.object({
  id: z.string(),
  category: z.string()
})

const postLessonSchema = z.object({
  course_id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  json: z.string(),
})



const postCommentSchema = z.object({
  lesson_slug: z.string(),
  created_by: z.object({
    id: z.number(),
    name: z.string()
  }),
  comment: z.string()
})

const postUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  admin: z.boolean()
})

const commentslink = "/comments"
const courseslink = "/courses"
const lessonslink = "/lessons"
const userslink = "/users"

console.log(`Server is running on port ${port}`);

const prisma = new PrismaClient()

serve({
  fetch: app.fetch,
  port,
});

// Courses

app.get(courseslink, async (c) => {
  try {
    const courses = await prisma.courses.findMany({
      include: {
        lessons: true,
      },
    });

    //Løste med chatgpt, men prøver å forstå så godt jeg kan
    const data = courses.map(course => ({
      ...course, 
      lessons: course.lessons.map(lesson => ({
        id: lesson.id,
        slug: lesson.slug,
        title: lesson.title,
        description: lesson.description,
        text: lesson.text,
      })),  
    }));

    if (data.length > 0) {
      return c.json({ success: true, data: data }, 200);
    } else {
      return c.json({ success: true, data: [] }, 204); 
    }
  } catch (err) {
    console.error(`Error writing to database`, err);
    return c.json({ success: false, error: `Error writing to database: ` + err }, 500);
  }
});

app.post(courseslink, async (c) => {
  const course = await c.req.json();  
  const courseData = {
  title: course['title'],
  slug: course['slug'],
  description: course['description'],
  category:course['category']
  }
  
  const lessonData = course['lessons']
  console.log(lessonData[0])

  try {
    postCourseSchema.parse(courseData)
    const newCourse = await prisma.courses.create({
      data: {
        id: `${Date.now()}`,
        title: courseData.title,
        slug: courseData.slug,
        description: courseData.description,
        category: courseData.category
      }
    })

    for (let i = 0; i < lessonData.length; i++) {
      console.log(lessonData[i])
      const newLesson = await prisma.lessons.create({
        data: {
          id: `${Date.now()}`,
          course_id: `${newCourse.id}`,
          title: lessonData[i]['title'],
          slug: lessonData[i]['slug'],
          description: lessonData[i]['description'],
          text: JSON.stringify(lessonData[i]['text']),
        }
      })
    }
  

    console.log('Insert Successful');
  } catch (err) {
    console.error(`Error adding:`, err);
    return c.json({success: false, error: `Failed adding`}, 500);
  }

  return c.json({success: true, message: `Successfully created the new course`}, 201);
});

app.patch(courseslink, async (c) =>

  {
    const courseData = {
      id: c.req.query('id'),
      category: c.req.query('category')
    }
    
  if (courseData.id != undefined) {
    try {
      patchCourseSchema.parse(courseData);
      const updatedProject = await prisma.courses.update({
          where: {
              id: +courseData.id
          },
          data: { status: courseData.category
           }
      });
      console.log("Updated project with id:", courseData.id);
      return c.json({success: true, message: `Category of ${courseData.id} updated to: ${courseData.category}.`}, 200);
  }
  catch (error) {
    console.error("Error updating project:", error);
    return c.json({success: false, error: `Error updating project: ` + error}, 500);
}  
}
else {
return c.json({success: false, error: `id is undefined.`}, 500);
}
})

app.delete(courseslink, async (c) => {
  const id = c.req.query('id');
  if (id) {
    try {
      
      const deletedCourse = await prisma.courses.delete({
        where: { id: id }
      });
      
      console.log("Deleted course with id:", id);
      return c.json({ success: true, message: `Course: ${id}, has been deleted `}, 200);
    } catch (error) {
      console.error("Error deleting project:", error);
      return c.json({ success: false, error: `Error deleting course: ` + error }, 500);
    }
  } else {
    return c.json({ success: false, error: `id is undefined.` }, 500);
  }
});

// Lessons

app.get(lessonslink, async (c) => {
  const course_id = c.req.query('course_id');

  if (!course_id) {return c.json({ success: false, error: `course_id is undefined.` }, 500);}
  try {
    const lessons = await prisma.lessons.findMany({
      where: {
        course_id: course_id
      },
      include: {
        comments: true,
        },
    });
    //Chatgpt ble brukt for å hjelpe til med å lage følgende
    const data = lessons.map(lesson => ({
      ...lessons,
      comments: lesson.comments.map(comment => comment.comment),
    }));
    console.log(data);
    if (data.size() > 0) {return c.json({success: true, data: data}, 200);}
    else {{return c.json({success: true, data: data}, 204);}}
  } catch (err) {
    console.error(`Error writing to database`, err);
    return c.json({success: true, error: `Error writing to database: ` + err}, 500);
  }
});

app.post(lessonslink, async (c) => {
  let newLesson;
  const body = await c.req.formData();
  const entries = body.entries();
  let lesson;
  
  for (let entry of entries) {
    lesson = JSON.parse(entry[1])
  }
  const lessonData = {
  course_id: lesson['course_id'],
  slug: lesson['slug'],
  title: lesson['title'],
  description: lesson['description'],
  text :lesson['text']
  }

  try {
    postLessonSchema.parse(lessonData)
    newLesson = await prisma.courses.create({
      data: {
        id: Date.now(),
        course_id: lessonData.course_id,
        slug: lessonData.slug,
        title: lessonData.title,
        description: lessonData.description,
        text: JSON.stringify(lessonData.text)
      }
    })

    console.log('Insert Successful');
  } catch (err) {
    console.error(`Error adding:`, err);
    return c.json({success: false, error: `Failed adding`}, 500);
  }

  return c.json({success: true, message: `Successfully created the new lesson`}, 201);
});

// Comments

app.get(commentslink, async (c) => {
  const lesson_slug = c.req.query('lesson_slug');
  if (!lesson_slug) {return c.json({ success: false, error: `lesson_slug is undefined.` }, 500);}
  try {
    const data = await prisma.comments.findMany({
      where: {
        lesson_slug: lesson_slug
      }
    });
    
    if (data.length > 0) {return c.json({success: true, data: data}, 200);}
    else {{return c.json({success: true, data: data}, 200);}}
  } catch (err) {
    console.error(`Error writing to database`, err);
    return c.json({success: true, error: `Error writing to database: ` + err}, 500);
  }
});

app.post(commentslink, async (c) => {
  let newComment;
  const body = await c.req.json();
  console.log(body)
  let comment;
  
  const commentData = {
  lesson_slug: body['lesson_slug'],
  created_by: body['created_by'],
  comment: body['comment'],
  }
  console.log(body['id'])
  console.log(commentData.id)

  try {
    postCommentSchema.parse(commentData)
    newComment = await prisma.comments.create({
      data: {
        id: `${Date.now()}`,
        lesson_slug: commentData.lesson_slug,
        created_by: JSON.stringify(commentData.created_by),
        comment: commentData.comment,
      }
    })

    console.log('Insert Successful');
  } catch (err) {
    console.error(`Error adding:`, err);
    return c.json({success: false, error: `Failed adding comment`}, 500);
  }

  return c.json({success: true, message: `Successfully added the new comment`}, 201);
});

// Users

app.get(userslink, async (c) => {

  try {
    const users = await prisma.users.findMany({
      
    });
    const data = users.map();
    console.log(data);
    if (data.size() > 0) {return c.json({success: true, data: data}, 200);}
    else {{return c.json({success: true, data: data}, 204);}}
  } catch (err) {
    console.error(`Error writing to database`, err);
    return c.json({success: true, error: `Error writing to database: ` + err}, 500);
  }
});

app.post(userslink, async (c) => {
  let newUser;
  const body = await c.req.formData();
  const entries = body.entries();
  let user;
  
  for (let entry of entries) {
    user = JSON.parse(entry[1])
  }
  const userData = {
  name: user['name'],
  email: user['email'],
  admin: user['admin'],
  }

  try {
    postUserSchema.parse(userData)
    newUser = await prisma.courses.create({
      data: {
        name: userData.name,
        email: userData.email,
        admin: userData.admin
      }
    })

    console.log('Insert Successful');
  } catch (err) {
    console.error(`Error adding:`, err);
    return c.json({success: false, error: `Failed adding comment`}, 500);
  }

  return c.json({success: true, message: `Successfully added the new user`}, 201);
});