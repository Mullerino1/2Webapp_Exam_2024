import { useRouter } from 'next/router';
import Link from "next/link"
import { courses } from '@/data/data';
import Layout from '@/components/Layout';

export default function CoursePage() {
  const router = useRouter()
  const { slug } = router.query

 
  const course = courses.find(c => c.slug === slug)

  
  if (!course) {
    return <div>Course not found</div>
  }

  return (
    
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>

      <h2>Lessons:</h2>
      <ul>
        {course.lessons.map((lesson) => (
          <li key={lesson.id}>
            {/* Lesson.slug later needs to be changed to lesson_slug */}
            <Link href={`/courses/${course.slug}/lessons/${lesson.slug}`}>
              {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
   
  )
}
