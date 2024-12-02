import { useRouter } from 'next/router';
import Link from "next/link"
import { courses, users } from '@/data/data';
import Layout from '@/components/Layout';
import Lesson from '../LessonPage';
import { useState, useEffect } from 'react';
import "../../styles/tailwind/main.css";
import { ofetch } from 'ofetch';
import { baseUrl, endpoints } from '@/lib/config/urls';

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
}

let initialized = false

const getCourses = async (): Promise<Course[]> => {
  try {
    const data = await ofetch(baseUrl + endpoints.courses);
    
    return data['data'];
    
  } catch (error) {
    console.error("Unable to fetch data:", error);
    return [];
  }
};

const getCourse = async (slug) => {
  const data = await ofetch(baseUrl + endpoints.courses, { parseResponse: JSON.parse });
  console.log("Fetched data" + JSON.stringify(data))
  const courses = await data['data'].filter((course) => course.slug === slug);
  console.log("Filtered Courses: " + JSON.stringify(courses))
  return courses?.[0];
};
  
//   const createCourse = async (data) => {
//     await courses.push(data);
//   };
  
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

export default function CoursePage() {
  const router = useRouter()
  const { slug } = router.query
  const [content, setContent] = useState();
  const [course, setCourse] = useState<Course | null>(null);
  
  useEffect(() => {
    if (!slug || initialized) return;
      initialized = true;
      const fetchData = async () => {
        const data = await getCourse(slug)
        setCourse(data);
      };
      fetchData();
    }
  , [slug]);

  
  if (!course) {
    return <div>Course not found</div>
  }
//   const courseSlug = "javascript-101";
  const lessonSlug = "";
  

//   useEffect(() => {
//     const getContent = async () => {
//       const data = await getCourse(courseSlug);
//       setContent(data);
//     };
//     getContent();
//   }, [courseSlug]);

  if (!slug) return (
    <>
    Loading...
    </>
  )

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
                  href={`/courses/${course.slug}/LessonPage/${lesson.slug}`}
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
