import { useRouter } from 'next/router';
import Link from "next/link"
import { courses, users } from '@/data/data';
import Layout from '@/components/Layout';
import Lesson from '../LessonPage';
import { useState, useEffect } from 'react';
import "../../styles/tailwind/main.css";



const getCourse = async (slug) => {
    const data = await courses.filter((course) => course.slug === slug);
    return data?.[0];
  };
  
//   const createCourse = async (data) => {
//     await courses.push(data);
//   };
  
  const getLesson = async (courseSlug, lessonSlug) => {
    const data = await courses
      .flatMap(
        (course) =>
          course.slug === courseSlug &&
          course.lessons.filter((lesson) => lesson.slug === lessonSlug)
      )
      .filter(Boolean);
    return data?.[0];
  };

export default function CoursePage() {
  const router = useRouter()
  const { slug, lessonSlug } = router.query
  const [content, setContent] = useState(null);
  
  
  const course = courses.find(c => c.slug === slug)

  
  if (!course) {
    return <div>Course not found</div>
  }
//   const courseSlug = "javascript-101";
  // const lessonSlug = "";
  

//   useEffect(() => {
//     const getContent = async () => {
//       const data = await getCourse(courseSlug);
//       setContent(data);
//     };
//     getContent();
//   }, [courseSlug]);

  return (
    
    <Layout>
        
    <div className="grid grid-cols-[250px_minmax(20%,1fr)_1fr] gap-16">
    <aside className="border-r border-slate-200 pr-6">
    <h3 className="mb-4 text-base font-bold">Leksjoner</h3>
          <ul data-testid="lessons">
            {course?.lessons?.map((lesson) => (
              <li
                className={`text-sm" mb-4 w-full max-w-[95%] rounded-lg border border-slate-300 px-4 py-2 ${
                  lessonSlug === lesson.slug ? "bg-emerald-300" : "bg-transparent"
                }`}
                key={lesson.id}
              >
                <Link
                  data-testid="lesson_url"
                  data-slug={lessonSlug}
                  className="block h-full w-full"
                  href={`/courses/${course.slug}/${lesson.slug}`}
                >
                  {lesson.title}
                </Link>
              </li>
            ))}
          </ul> 
         
        </aside>
        {lessonSlug ? (
      <article>
            <Lesson />
          </article>    
        ) : (
          <section>
            <>
              <h2 className="text-2xl font-bold" data-testid="course_title">
                {course.title}
              </h2>
              <p
                className="mt-4 font-semibold leading-relaxed"
                data-testid="course_description"
              >
                {course.description}
              </p>
            </>
          </section>
        )}
        <aside
          data-testid="enrollments"
          className="border-l border-slate-200 pl-6"
        >
          <h3 className="mb-4 text-base font-bold">Deltakere</h3>
          <ul data-testid="course_enrollments">
            {users?.map((user) => (
              <li className="mb-1" key={user.id}>
                {user.name}
              </li>
            ))}
          </ul>
        </aside>
    </div>
    </Layout>  
  )
}
