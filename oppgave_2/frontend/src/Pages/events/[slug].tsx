"use client"

import { useRouter } from 'next/router';
import Link from "next/link"
import Layout from '@/layout/Layout';
import "@/styles/css/main.css"
import Arrangement from '../ArrangementPage';
import Tickets from "@/components/Tickets";
import useTicket from '@/hooks/useTickets';
import type { HandleTicket, Ticket as TicketType } from "@/components/Types";
import React, { useEffect, useState } from 'react';
import { URLS } from '@/config/urls';
import { ofetch } from 'ofetch';

interface Event {
  id: string;
  title: string;
  description: string;
  slug: string;
  date: object;
  location: string;
  type: string;
  seats: number;
  price?: number;
  waiting_list: boolean
}

const getEvent = async (slug: string) => {
  try {
    const response = await ofetch(URLS.events);
    const event = response.data.find((event) => event.slug === slug);
    return event;
  } catch (error) {
    console.error('Failed to fetch event:', error);
    return null;
  }
};

export default function EventPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { add, status, get, data, error } = useTicket();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const tickets = data;

  const arrangementSlug = ""; // You might want to define this differently

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedEvent = await getEvent(slug as string);
        setEvent(fetchedEvent);
        console.log(event)
      } catch (error) {
        console.error('Error fetching event:', error);
        setEvent(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleTicketMutation: HandleTicket = (props) => {
    const { action } = props;

    switch (action) {
      case "add":
        add(props.ticket);
        break;
    }
  };

  // Claude helped with render problems, Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Claude recognized that this was to high up, a problem we previously had, and failed to recognize.
  if (!event) {
    return <div>Event not found</div>;
  }

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
              <h4>[{event.type}]</h4>
              <p>the price is {event.price}, we have {event.seats} seats, 
                and it happens on {JSON.parse(event.date)['day']}.{JSON.parse(event.date)['month']}.{JSON.parse(event.date)['year']}</p>
              <p>{event.location}</p>
              <p
                className="mt-4 font-semibold leading-relaxed"
                data-testid="course_description">
                {event.description}
              </p>
            </section>
            <Tickets tickets={tickets} handleTicketMutation={handleTicketMutation}> </Tickets>
          </section>
        )}
      </div>
    </Layout>  
  )
}