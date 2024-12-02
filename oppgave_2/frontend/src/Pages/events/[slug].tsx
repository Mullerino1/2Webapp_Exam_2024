"use client"


import { useRouter } from 'next/router';
import Link from "next/link"
import Layout from '@/layout/Layout';
import { events, users } from '@/data/data';
import "@/styles/css/main.css"
import Arrangement from '../ArrangementPage';
import Project from "@/components/Tickets";
import useTicket from '@/hooks/useTickets';
import type { HandleProject, Ticket as ProjectType } from "@/components/Types";
import React, { useEffect, useState } from 'react';
import { URLS } from '@/config/urls';
import { ofetch } from 'ofetch';

//Slug setup was mainly found from this website https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes and form the class courses

let initialized = false;

const getEvent = async (slug) => {
    const data = await ofetch(URLS.events)
    const event = await data.filter((event) => event.slug === slug);
    return event?.[0];
  };
  


export default function EventPage() {
  const router = useRouter()
  const { slug } = router.query
  const arrangementSlug = "";
  const { add, status, get, data, error } = useTicket();
  const [event, setEvent] = useState("")
  const tickets = data;

  if (!event) {
    return <div>Event not found</div>
  }

  useEffect(() => {
    if (!slug || initialized) return;
    initialized = true;
    const fetchData = async () => {
      const data = await getEvent(slug as string);
      console.log(data)
      setEvent(data);
    };
    fetchData();
  }, [slug]);

  const handleProjectMutation: HandleProject = (props) => {
    const { action } = props;

    switch (action) {
      case "add":
        add(props.ticket);
        break;
    }
  };

  const addTicketServer = async (id: string) => {
    try {
      return fetch("http://localhost:4000", {
        method: "POST",
        body: JSON.stringify({
          note: "",
          projectId: id,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  if (!slug) return (
    <>
    Loading...
    </>
  )

  return ( 
    <Layout>
    <div className="grid grid-cols-[250px_minmax(20%,1fr)_1fr] gap-16">
    <aside className="border-r border-slate-200 pr-6">
          <Link href={`/EventsPage`}>
              <h3 className="mb-4 text-base font-bold">Events</h3>
          </Link>
        </aside>
        {arrangementSlug ? (
      <article>
            <Arrangement />
          </article>    
        ) : (
          <section>
              <h2 className="text-2xl font-bold" data-testid="course_title">
                {event.title}
              </h2>
              <section className='EventInformation'>
              <h4>[{event.category}]</h4>
              <p>the price is {event.price}, we have {event.seats} seats</p>
              <p>{event.location}</p>
              <p
                className="mt-4 font-semibold leading-relaxed"
                data-testid="course_description" >
                {event.description}
              </p>
              </section>
              <Project tickets={tickets} handleProjectMutation={handleProjectMutation}> </Project>
          </section>
        )}
    </div>
    </Layout>  
  )
}