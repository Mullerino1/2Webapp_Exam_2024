
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Link from "next/link"

import {
  categories,
  courses,
} from "../data/data";

import { useParams, useRouter } from "next/navigation";

const getCourse = async (slug) => {
    const data = await courses.filter((course) => course.slug === slug);
    return data?.[0];
  };
  
//   const createCourse = async (data) => {
//     await courses.push(data);
//   };
  
//   const getLesson = async (courseSlug, lessonSlug) => {
//     const data = await courses
//       .flatMap(
//         (course) =>
//           course.slug === courseSlug &&
//           course.lessons.filter((lesson) => lesson.slug === lessonSlug)
//       )
//       .filter(Boolean);
//     return data?.[0];
//   };
  
//   const getComments = async (lessonSlug) => {
//     const data = await comments.filter(
//       (comment) => comment.lesson.slug === lessonSlug
//     );
//     return data;
//   };
  
//   const createComment = async (data) => {
//     await comments.push(data);
//   };


export default function Courses() {
    const [value, setValue] = useState("");
    const [data, setData] = useState(courses);
  
    const handleFilter = (event) => {
      const category = event.target.value;
      setValue(category);
      if (category && category.length > 0) {
        const content = courses.filter((course) =>
          course.category.toLocaleLowerCase().includes(category.toLowerCase())
        );
        setData(content);
      } else {
        setData(courses);
      }
    };
  
    return (
      <>
      <Layout>
        <header className="mt-8 flex items-center justify-between">
          <h2 className="mb-6 text-xl font-bold" data-testid="title">
            Alle kurs
          </h2>
          <label className="flex flex-col text-xs font-semibold" htmlFor="filter">
            <span className="sr-only mb-1 block">Velg kategori:</span>
            <select
              id="filter"
              name="filter"
              data-testid="filter"
              value={value}
              onChange={handleFilter}
              className="min-w-[200px] rounded bg-slate-200"
            >
              <option value="">Alle</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </header>
        <section className="mt-6 grid grid-cols-3 gap-8" data-testid="courses">
          {data && data.length > 0 ? (
            data.map((course) => (
              <article
                className="rounded-lg border border-slate-400 px-6 py-8"
                key={course.id}
                data-testid="course_wrapper"
              >
                <span className="block text-right capitalize">
                  [{course.category}]
                </span>
                <h3
                  className="mb-2 text-base font-bold"
                  data-testid="courses_title"
                >
                  <Link href={`/CoursePage/${course.slug}`}>{course.title}</Link>
                </h3>
                <p
                  className="mb-6 text-base font-light"
                  data-testid="courses_description"
                >
                  {course.description}
                </p>
                <Link
                  className="font-semibold underline"
                  data-testid="courses_url"
                  href={`/CoursePage/${course.slug}`}
                >
                  Til kurs
                </Link>
              </article>
            ))
          ) : (
            <p data-testid="empty">Ingen kurs</p>
          )}
        </section>
        </Layout>
      </>
    );
  }