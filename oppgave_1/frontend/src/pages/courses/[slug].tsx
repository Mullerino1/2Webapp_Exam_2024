import { useRouter } from 'next/router';
import Link from "next/link";
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
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  slug: string;
}

let initialized = false;

const getCourses = async (): Promise<Course[]> => {
  try {
    const data = await ofetch(baseUrl + endpoints.courses);
    return data['data'];
  } catch (error) {
    console.error("Unable to fetch data:", error);
    return [];
  }
};

const getCourse = async (slug: string) => {
  try {
    const data = await ofetch(baseUrl + endpoints.courses, { parseResponse: JSON.parse });
    const courses = await data['data'].filter((course) => course.slug === slug);
    return courses?.[0];
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
};

export default function CoursePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [course, setCourse] = useState<Course | null>(null);
  const [lessonSlug, setLessonSlug] = useState("");

  useEffect(() => {
    if (!slug || initialized) return;
    initialized = true;
    const fetchData = async () => {
      const data = await getCourse(slug as string);
      setCourse(data);
    };
    fetchData();
  }, [slug]);

  if (!course) {
    return <div>Course not found</div>;
  }

  if (!slug) {
    return <>Loading...</>;
  }

  return (
    <Layout>
      <div className="grid grid-cols-[250px_minmax(20%,1fr)_1fr] gap-16">
        <aside className="border-r border-slate-200 pr-6">
          <h3 className="mb-4 text-base font-bold">Leksjoner</h3>
          <ul data-testid="lessons">
            {course?.lessons?.map((lesson) => (
              <li
                className={`text-sm mb-4 w-full max-w-[95%] rounded-lg border border-slate-300 px-4 py-2 ${
                  lessonSlug === lesson.slug ? "bg-emerald-300" : "bg-transparent"
                }`}
                key={lesson.id}
              >
                <a
                  data-testid="lesson_url"
                  className="block h-full w-full cursor-pointer"
                  //Kunne sikkert tenkt meg fram til det, men fant denne med chatgpt
                  onClick={(e) => {
                    e.preventDefault();
                    setLessonSlug(lesson.slug);
                  }}
                >
                  {lesson.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
        {lessonSlug ? (
          <article>
            <Lesson 
                courseSlug={course.slug} 
                lessonSlug={lessonSlug} />
          </article>
        ) : (
          <section>
            <>
              <h2 className="text-2xl font-bold" data-testid="course_title">
                {course.title}
              </h2>
              <p
                className="mt-4 font-semibold leading-relaxed"
                data-testid="course_description">
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
  );
}