import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { ofetch } from "ofetch";
import { baseUrl, endpoints } from "@/lib/config/urls";

import { categories } from "../data/data";  // Assuming you have categories available

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
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

export default function Courses() {
  const [value, setValue] = useState("");
  const [data, setData] = useState<Course[]>([]);

  // First useEffect to fetch data
  useEffect(() => {
    if (!initialized) {
      initialized = true;
      const fetchData = async () => {
        const courses = await getCourses();
        setData(courses);
      };
      fetchData();
    }
  }, []);

  const handleFilter = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setValue(category);
    try {
      if (category && category.length > 0) {
        const courses = await getCourses();
        const content = courses.filter((course) =>
          course.category.toLocaleLowerCase().includes(category.toLowerCase())
        );
        setData(content);
      } else {
        setData(await getCourses());
      }
    } catch (error) {
      console.error("Error filtering courses:", error);
    }
  };

  return (
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
        {data.length > 0 ? (
          data.map((course) => (
            <article
              className="rounded-lg border border-slate-400 px-6 py-8"
              key={course.id}
              data-testid="course_wrapper"
            >
              <span className="block text-right capitalize">
                [{course.category}]
              </span>
              <h3 className="mb-2 text-base font-bold" data-testid="courses_title">
                <Link href={`/courses/${course.slug}`}>{course.title}</Link>
              </h3>
              <p className="mb-6 text-base font-light" data-testid="courses_description">
                {course.description}
              </p>
              <Link className="font-semibold underline" data-testid="courses_url" href={`/courses/${course.slug}`}>
                Til kurs
              </Link>
            </article>
          ))
        ) : (
          <p data-testid="empty">Ingen kurs</p>
        )}
      </section>
    </Layout>
  );
}