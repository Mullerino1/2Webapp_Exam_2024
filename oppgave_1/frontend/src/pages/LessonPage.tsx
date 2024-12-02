import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { ofetch } from "ofetch";
import { useRouter } from "next/router";
import { baseUrl, endpoints } from "@/lib/config/urls";

const getLesson = async (courseSlug, lessonSlug) => {
  try {
    //Fikk hjelp av chatGpt til å finne denne, feilsøkt en del mot den
    const data = await ofetch(baseUrl + endpoints.courses, { parseResponse: JSON.parse });
    const lessons = data.data

    lessons.flatMap((course) => (course.slug === courseSlug ? course.lessons : []))
    .filter((lesson) => lesson.slug === lessonSlug);
    return lessons?.[0] || null;
  } catch (error) {
    console.error("Error fetching lesson:", error);
    return null;
  }
};

const getComments = async (lessonSlug) => {
  try {
    const data = await ofetch(baseUrl + endpoints.comments, { query: { lesson_slug: lessonSlug } });
    const comment = data.data.filter((comment) => comment.lesson_slug === lessonSlug);
    console.log(comment)
    return comment
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

const createComment = async (data) => {
  try {
    await ofetch(baseUrl + endpoints.comments, {
      method: "POST",
      body: data,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
  }
};

export default function Lesson({ courseSlug, lessonSlug }) {
  const [lesson, setLesson] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    if (!courseSlug || !lessonSlug) return;

    const fetchLessonData = async () => {
      const lessonData = await getLesson(courseSlug, lessonSlug);
      const commentsData = await getComments(lessonSlug);
      setLesson(lessonData);
      setComments(commentsData);
    };

    fetchLessonData();
  }, [courseSlug, lessonSlug]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(false);
    setSuccess(false);

    if (!name || !comment) {
      setFormError(true);
      return;
    }

    await createComment({
      created_by: {
        id: Date.now(),
        name,
      },
      comment,
      lesson_slug: lessonSlug,
    });

    const updatedComments = await getComments(lessonSlug);
    setComments(updatedComments);
    setSuccess(true);
    setComment("");
    setName("");
  };

  if (!lesson) return <div>Loading lesson...</div>;

  return (
    <Layout>
      <div>
        <h2 className="text-2xl font-bold">{lesson.title}</h2>
        <p>{lesson.description}</p>
        {lesson.text?.map((textBlock, index) => (
          <p key={index}>{textBlock.text}</p>
        ))}

        <section>
          <h4>Comments ({comments.length})</h4>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Comment:
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
          {formError && <p>Please fill out all fields</p>}
          {success && <p>Comment added!</p>}

          <ul>
            {comments.map((c) => (
              <li key={c.id}>
                <strong>{c.created_by.name}:</strong> {c.comment}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
}