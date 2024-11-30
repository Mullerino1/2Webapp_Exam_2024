import { useRouter } from 'next/router';
import Link from "next/link"
import Layout from '@/layout/Layout';
import { events, users } from '@/data/data';
// import Lesson from '../LessonPage';
import { useState, useEffect } from 'react';
import "@/styles/css/main.css"
import Arrangement from '../ArrangementPage';



const getEvents = async (slug) => {
    const data = await events.filter((event) => event.slug === slug);
    return data?.[0];
  };
  
//   const createCourse = async (data) => {
//     await courses.push(data);
//   };
  
//   const getLesson = async (courseSlug, lessonSlug) => {
//     const data = await events
//       .flatMap(
//         (course) =>
//           course.slug === courseSlug &&
//           course.lessons.filter((lesson) => lesson.slug === lessonSlug)
//       )
//       .filter(Boolean);
//     return data?.[0];
//   };

export default function EventPage() {
  const router = useRouter()
  const { slug } = router.query
  const [content, setContent] = useState(null);
  
  
 
  const event = events.find(c => c.slug === slug)

  
  if (!event) {
    return <div>Event not found</div>
  }
//   const courseSlug = "javascript-101";
  const arrangementSlug = "";
  

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
    <h3 className="mb-4 text-base font-bold">Events</h3>
          <ul data-testid="lessons">
            {event?.arrangements?.map((arrangement) => (
              <li
                className={`text-sm" mb-4 w-full max-w-[95%] rounded-lg border border-slate-300 px-4 py-2 ${
                    arrangementSlug === arrangement.slug ? "bg-emerald-300" : "bg-transparent"
                }`}
                key={arrangement.id}
              >
                <Link
                  data-testid="lesson_url"
                  data-slug={arrangementSlug}
                  className="block h-full w-full"
                  href={`/events/${event.slug}/${arrangement.slug}`}
                >
                  {arrangement.title}
                </Link>
              </li>
            ))}
          </ul> 
         
        </aside>
        {arrangementSlug ? (
      <article>
            <Arrangement />
          </article>    
        ) : (
          <section>
            <>
              <h2 className="text-2xl font-bold" data-testid="course_title">
                {event.title}
              </h2>
              <p
                className="mt-4 font-semibold leading-relaxed"
                data-testid="course_description"
              >
                {event.description}
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