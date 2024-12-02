"use client"



import { useState, useEffect } from "react";
import Link from "next/link"
import Layout from "@/layout/Layout";
import { events} from "../data/data";
import { useRouter } from "next/router";
import { ofetch } from "ofetch";
import { URLS } from "@/config/urls";

const getEvent = async (slug) => {
  const data = await ofetch(URLS.events)
  const events = data.filter((event) => event.slug === slug);
  return events.data;
};

const getArrangement = async (eventSlug, arrangementSlug) => {
  const data = await ofetch(URLS.events)
  const events = data
    .flatMap(
      (event) =>
        event.slug === eventSlug &&
        event.arrangement.filter((arrangement) => arrangement.slug === arrangementSlug)
    )
    .filter(Boolean);
  return data?.[0];
};


export default function Arrangement() {
    const [lesson, setLesson] = useState(null);
    const [course, setCourse] = useState(null);
    const eventSlug = "";
    const arrangementSlug = "";
    const router = useRouter()
    const { slug } = router.query

  
    useEffect(() => {
      const getContent = async () => {
        const arrangementDate = await getArrangement(eventSlug, arrangementSlug);
        const eventData = await getEvent(eventSlug, arrangementSlug);
        setLesson(arrangementDate);
        setCourse(eventData);
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
            Category: <span className="font-bold">{events?.category}</span>
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
      </div>
      </Layout>
    );
  }
  