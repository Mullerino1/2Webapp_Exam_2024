"use client"

import { useState, useEffect } from "react";
import Layout from "@/layout/Layout";
import Link from "next/link"
import "../styles/css/main.css"
import {categories, events } from "../data/data";
import { ofetch } from "ofetch";
import { URLS } from "@/config/urls";

interface Event {
  id: string;
  title: string;
  description: string;
  slug: string;
  date: object;
  location: string;
  type: string;
  seats: number;
  waiting_list: boolean
}

let initialized = false;

const getEvents = async () => {
    const data = await ofetch(URLS.events)
    const events = data
    return events.data;
  };
  
export default function Events() {
    const [value, setValue] = useState("");
    const [data, setData] = useState<Event[]>([]);
  
    const handleFilter = async (event) => {
      const type = event.target.value;
      setValue(type);
      if (type && type.length > 0) {
        const events = await getEvents();
        const content = events.filter((event) =>
          event.type.toLocaleLowerCase().includes(type.toLowerCase())
        );
        setData(content);
      } else {
        setData(events);
      }
    };

    useEffect(() => {
      if (!initialized) {
      initialized = true;
      const fetchData = async () => {
        const data = await getEvents();
        setData(data);
      };
      
      fetchData();
    }
    }, []);
  
    return (
      <>
      <Layout>
        <header>
          <h2>
            All Events  
          </h2>
          <label htmlFor="filter">
            <span>Event Type</span>
            <select
              id="filter"
              name="filter"
              data-testid="filter"
              value={value}
              onChange={handleFilter}
              className="min-w-[200px] rounded bg-slate-200">
              <option value="">All Events</option>
              {categories.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </header>
        <section>
          {data && data.length > 0 ? (
            data.map((event) => (
              <article key={event.id}>
                <span>
                  [{event.type}]
                </span>
                <h3>
                  <Link href={`/events/${event.slug}`}>{event.title}</Link>
                </h3>
                <p>
                  {event.description}
                </p>
                <Link href={`/events/${event.slug}`}>
                  To Event
                </Link>
              </article>
            ))
          ) : (
            <p data-testid="empty">No Event</p>
          )}
        </section>
        </Layout>
      </>
    );
  }