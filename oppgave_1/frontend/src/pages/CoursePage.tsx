import { useState, useEffect } from "react";

export default function Course() {
    const [content, setContent] = useState(null);
  
    const courseSlug = "javascript-101";
    const lessonSlug = "variabler";
  
    useEffect(() => {
      const getContent = async () => {
        const data = await getCourse(courseSlug);
        setContent(data);
      };
      getContent();
    }, [courseSlug]);
  
    return (
      <div className="grid grid-cols-[250px_minmax(20%,1fr)_1fr] gap-16">
        <aside className="border-r border-slate-200 pr-6">
          <h3 className="mb-4 text-base font-bold">Leksjoner</h3>
          <ul data-testid="lessons">
            {content?.lessons?.map((lesson) => (
              <li
                className={`text-sm" mb-4 w-full max-w-[95%] rounded-lg border border-slate-300 px-4 py-2 ${
                  lessonSlug === lesson.slug ? "bg-emerald-300" : "bg-transparent"
                }`}
                key={lesson.id}
              >
                <a
                  data-testid="lesson_url"
                  data-slug={lessonSlug}
                  className="block h-full w-full"
                  href={`/kurs/${content?.slug}/${lesson.slug}`}
                >
                  {lesson.title}
                </a>
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
                {content?.title}
              </h2>
              <p
                className="mt-4 font-semibold leading-relaxed"
                data-testid="course_description"
              >
                {content?.description}
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
    );
  }
  
  function Courses() {
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
                  <a href={`/kurs/${course.slug}`}>{course.title}</a>
                </h3>
                <p
                  className="mb-6 text-base font-light"
                  data-testid="courses_description"
                >
                  {course.description}
                </p>
                <a
                  className="font-semibold underline"
                  data-testid="courses_url"
                  href={`/kurs/${course.slug}`}
                >
                  Til kurs
                </a>
              </article>
            ))
          ) : (
            <p data-testid="empty">Ingen kurs</p>
          )}
        </section>
      </>
    );
  }
  
  function Lesson() {
    const [success, setSuccess] = useState(false);
    const [formError, setFormError] = useState(false);
    const [lessonComments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [name, setName] = useState("");
    const [lesson, setLesson] = useState(null);
    const [course, setCourse] = useState(null);
    const courseSlug = "javascript-101";
    const lessonSlug = "variabler";
  
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
          lesson: { slug: lessonSlug },
        });
        const commentsData = await getComments(lessonSlug);
        setComments(commentsData);
        setSuccess(true);
      }
    };
  
    useEffect(() => {
      const getContent = async () => {
        const lessonDate = await getLesson(courseSlug, lessonSlug);
        const courseData = await getCourse(courseSlug, lessonSlug);
        const commentsData = await getComments(lessonSlug);
        setLesson(lessonDate);
        setCourse(courseData);
        setComments(commentsData);
      };
      getContent();
    }, [courseSlug, lessonSlug]);
  
    return (
      <div>
        <div className="flex justify-between">
          <h3 data-testid="course_title" className="mb-6 text-base font-bold">
            <a className="underline" href={`/kurs/${course?.slug}`}>
              {course?.title}
            </a>
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
    );
  }

