"use client"



import { useState, useEffect } from "react";
import Link from "next/link"
import Layout from "@/layout/Layout";

import {
  categories,
  comments,
  courseCreateSteps,
  events,
  users,
} from "../data/data";

import { useRouter } from "next/router";

const getEvent = async (slug) => {
  const data = await events.filter((event) => event.slug === slug);
  return data?.[0];
};



const getLesson = async (eventSlug, arrangementSlug) => {
  const data = await events
    .flatMap(
      (event) =>
        event.slug === eventSlug &&
        event.arrangement.filter((arrangement) => arrangement.slug === arrangementSlug)
    )
    .filter(Boolean);
  return data?.[0];
};



export default function Arrangement() {

    const [comment, setComment] = useState("");
    const [name, setName] = useState("");
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
        // const commentsData = await getComments(lessonSlug);
        setLesson(arrangementDate);
        setCourse(eventData);
        // setComments(commentsData);
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
            Kategori: <span className="font-bold">{events?.category}</span>
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
  