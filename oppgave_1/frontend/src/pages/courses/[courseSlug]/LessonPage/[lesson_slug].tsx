
import { useState, useEffect } from "react";
import Link from "next/link"
import Layout from "@/components/Layout";
import { ofetch } from "ofetch";

import {
  categories,
  comments,
  courseCreateSteps,
  courses,
  users,
} from "../data/data";

import { useRouter } from "next/router";
import { baseUrl,endpoints } from "@/lib/config/urls";

let initialized = false;

const getCourse = async (slug) => {
  const data = await ofetch(baseUrl + endpoints.courses, { parseResponse: JSON.parse });
  console.log("Fetched data" + JSON.stringify(data))
  const courses = await data['data'].filter((course) => course.slug === slug);
  console.log("Filtered Courses: " + JSON.stringify(courses))
  return courses?.[0];
};

// const createCourse = async (data) => {
//   await courses.push(data);
// };

const getLesson = async (courseSlug, lesson_slug) => {
  try {
    const data = await ofetch(baseUrl + endpoints.courses, { parseResponse: JSON.parse });
    
    // Flatten the lessons from all courses and filter for the desired one
    const lessons = data
      .flatMap((course) => 
        course.slug === courseSlug ? course.lessons : [] // Only take lessons for the matched course
      )
      .filter((lesson) => lesson.slug === lesson_slug); // Filter for the desired lesson
    
    return lessons?.[0] || null; // Return the first matching lesson or null
  } catch (error) {
    console.error("Error fetching lesson:", error);
    return null; // Handle errors gracefully
  }
};

const getComments = async (lesson_slug) => {
  const data = await ofetch(baseUrl + endpoints.comments, {query: lesson_slug})
  const comments = data.filter(
    (comment) => comment.lesson_slug === lesson_slug
  );
  return data;
};

const createComment = async (data) => {
  await ofetch(baseUrl + endpoints.comments, {
    method: "POST",
    body: data})
};


export default function Lesson() {
    const [success, setSuccess] = useState(false);
    const [formError, setFormError] = useState(false);
    const [lessonComments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [name, setName] = useState("");
    const [lesson, setLesson] = useState(null);
    const [course, setCourse] = useState(null);

    const router = useRouter()
    const { courseSlug } = router.query
    const { lesson_slug } = router.query
    
  
    const handleComment = (event) => {
      setComment(event.target.value);
    };
  
    const handleName = (event) => {
      setName(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setFormError(false);
      setSuccess(false);
      if (!comment || !name) {
        setFormError(true);
      } else {
        await createComment({
          id: `${Math.floor(Math.random() * 1000 + 1)}`,
          createdBy: {
            id: Math.floor(Math.random() * 1000 + 1),
            name,
          },
          comment,
          lesson_slug: lesson_slug ,
        });
        const commentsData = await getComments(lesson_slug);
        setComments(commentsData);
        setSuccess(true);
      }
    };
  
    useEffect(() => {
      if ((!courseSlug && !lesson_slug) || initialized) return;
      initialized = true;
      const getContent = async () => {
        const lessonDate = await getLesson(courseSlug, lesson_slug);
        const courseData = await getCourse(courseSlug);
        const commentsData = await getComments(lesson_slug);
        setLesson(lessonDate);
        setCourse(courseData);
        setComments(commentsData);
      };
      getContent();
    }, [courseSlug, lesson_slug]);
    
    if (!courseSlug && !lesson_slug) return (
      <>
      Loading...
      </>
    )

    return (
      <Layout>
      <div>
        <div className="flex justify-between">
          <h3 data-testid="course_title" className="mb-6 text-base font-bold">
            <Link className="underline" href={`/courses/${course?.slug}`}>
              {course?.title}
            </Link>
          </h3>
          <span data-testid="course_category">
            Kategori: <span className="font-bold">{course?.category}</span>
          </span>
        </div>
        <h2 className="text-2xl font-bold" data-testid="lesson_title">
          {lesson?.title}
        </h2>
        <p
          data-testid="lesson_preAmble"
          className="mt-4 font-semibold leading-relaxed"
        >
          {lesson?.preAmble}
        </p>
        {lesson?.text?.length > 0 &&
          lesson.text.map((text) => (
            <p
              data-testid="lesson_text"
              className="mt-4 font-normal"
              key={text.id}
            >
              {text.text}
            </p>
          ))}
        <section data-testid="comments">
          <h4 className="mt-8 mb-4 text-lg font-bold">
            Kommentarer ({lessonComments?.length})
          </h4>
          <form data-testid="comment_form" onSubmit={handleSubmit} noValidate>
            <label className="mb-4 flex flex-col" htmlFor="name">
              <span className="mb-1 text-sm font-semibold">Navn*</span>
              <input
                data-testid="form_name"
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleName}
                className="w-full rounded bg-slate-100"
              />
            </label>
            <label className="mb-4 flex flex-col" htmlFor="comment">
              <span className="mb-1 text-sm font-semibold">
                Legg til kommentar*
              </span>
              <textarea
                data-testid="form_textarea"
                type="text"
                name="comment"
                id="comment"
                value={comment}
                onChange={handleComment}
                className="w-full rounded bg-slate-100"
                cols="30"
              />
            </label>
            <button
              className="rounded bg-emerald-600 px-10 py-2 text-center text-base text-white"
              data-testid="form_submit"
              type="submit"
            >
              Legg til kommentar
            </button>
            {formError ? (
              <p className="font-semibold text-red-500" data-testid="form_error">
                Fyll ut alle felter med *
              </p>
            ) : null}
            {success ? (
              <p
                className="font-semibold text-emerald-500"
                data-testid="form_success"
              >
                Skjema sendt
              </p>
            ) : null}
          </form>
          <ul className="mt-8" data-testid="comments_list">
            {lessonComments?.length > 0
              ? lessonComments.map((c) => (
                  <li
                    className="mb-6 rounded border border-slate-200 px-4 py-6"
                    key={c.id}
                  >
                    <h5 data-testid="user_comment_name" className="font-bold">
                      {c.createdBy.name}
                    </h5>
                    <p data-testid="user_comment">{c.comment}</p>
                  </li>
                ))
              : null}
          </ul>
        </section>
      </div>
      </Layout>
    );
  }
  