
import { useState, useEffect } from "react";
import Link from "next/link"
import Layout from "@/layout/Layout";

import {
  categories,
  comments,
  courseCreateSteps,
  events,
  users,
} from "../data/data";

import { useRouter } from "next/router";

const getEvent = async (slug) => {
  const data = await events.filter((event) => event.slug === slug);
  return data?.[0];
};

// const createCourse = async (data) => {
//   await courses.push(data);
// };

const getLesson = async (eventSlug, arrangementSlug) => {
  const data = await events
    .flatMap(
      (event) =>
        event.slug === eventSlug &&
        event.arrangement.filter((arrangement) => arrangement.slug === arrangementSlug)
    )
    .filter(Boolean);
  return data?.[0];
};

// const getComments = async (lessonSlug) => {
//   const data = await comments.filter(
//     (comment) => comment.lesson.slug === lessonSlug
//   );
//   return data;
// };

// const createComment = async (data) => {
//   await comments.push(data);
// };


export default function Arrangement() {
    const [success, setSuccess] = useState(false);
    const [formError, setFormError] = useState(false);
    const [lessonComments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [name, setName] = useState("");
    const [lesson, setLesson] = useState(null);
    const [course, setCourse] = useState(null);
    const eventSlug = "";
    const arrangementSlug = "";

    const router = useRouter()
    const { slug } = router.query
    
    
  
    const handleComment = (event) => {
      setComment(event.target.value);
    };
  
    const handleName = (event) => {
      setName(event.target.value);
    };
  
    // const handleSubmit = async (event) => {
    //   event.preventDefault();
    //   setFormError(false);
    //   setSuccess(false);
    //   if (!comment || !name) {
    //     setFormError(true);
    //   } else {
    //     await createComment({
    //       id: `${Math.floor(Math.random() * 1000 + 1)}`,
    //       createdBy: {
    //         id: Math.floor(Math.random() * 1000 + 1),
    //         name,
    //       },
    //       comment,
    //       lesson: { slug: lessonSlug },
    //     });
    //     const commentsData = await getComments(lessonSlug);
    //     setComments(commentsData);
    //     setSuccess(true);
    //   }
    // };
  
    useEffect(() => {
      const getContent = async () => {
        const arrangementDate = await getArrangement(eventSlug, arrangementSlug);
        const eventData = await getEvent(eventSlug, arrangementSlug);
        // const commentsData = await getComments(lessonSlug);
        setLesson(arrangementDate);
        setCourse(eventData);
        // setComments(commentsData);
      };
      getContent();
    }, [eventSlug, arrangementSlug]);
  
    return (
      <Layout>
      <div>
        <div className="flex justify-between">
          <h3 data-testid="course_title" className="mb-6 text-base font-bold">
            <Link className="underline" href={`/events/${events?.slug}`}>
              {events?.title}
            </Link>
          </h3>
          <span>
            Kategori: <span className="font-bold">{events?.category}</span>
          </span>
        </div>
        <h2 >
          {events?.title}
        </h2>
        <p
          data-testid="lesson_preAmble"
          className="mt-4 font-semibold leading-relaxed"
        >
          {events?.preAmble}
        </p>
        {events?.text?.length > 0 &&
          events.text.map((text) => (
            <p
              data-testid="lesson_text"
              className="mt-4 font-normal"
              key={text.id}
            >
              {text.text}
            </p>
          ))}
        {/* <section data-testid="comments">
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
        </section> */}
      </div>
      </Layout>
    );
  }
  