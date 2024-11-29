import app from "./app";
import { port } from "./config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { PrismaClient } from '@prisma/client'

const commentslink = "http://localhost:3999/comments"
const courseslink = "http://localhost:3999/courses"
const lessonslink = "http://localhost:3999/lessons"
const userslink = "http://localhost:3999/users"

console.log(`Server is running on port ${port}`);

const prisma = new PrismaClient()

serve({
  fetch: app.fetch,
  port,
});

app.get(courseslink, async (c) => {
  try {
    const courses = await prisma.courses.courses({
      include: {
        lessons: true,
        },
    });
    const data = courses.map(course => ({
      ...courses,
      lessons: course.lessons.map(lesson => lesson.lesson),  // Convert tags to an array of strings
    }));
    console.log(data);
    if (data.size() > 0) {return c.json({success: true, data: data}, 200);}
    else {{return c.json({success: true, data: data}, 204);}}
  } catch (err) {
    console.error(`Error writing to database`, err);
    return c.json({success: true, error: `Error writing to database: ` + err}, 500);
  }
});

app.post(courseslink, async (c) => {
  let tempdata;

  // Setting body to be the JSON Data from the request
  let newCourse;
  const body = await c.req.formData();
  const entries = body.entries();
  let course;
  
  for (let entry of entries) {
    course = JSON.parse(entry[1])
  }
  const courseData = {
  title: course['title'],
  slug: course['slug'],
  description: course['description'],
  category:course['category']
  }

  try {
    newCourse = await prisma.courses.create({
      data: {
        title: courseData.title,
        slug: courseData.slug,
        description: courseData.description,
        category: courseData.category
      }
    })
    

    console.log(newCourse.id)

    

    console.log('Insert Successful');
  } catch (err) {
    console.error(`Error adding:`, err);
    return c.json({success: false, error: `Failed adding`}, 500);
  }

  return c.json({success: true, data: {id: newcourse['id']}}, 201);
});