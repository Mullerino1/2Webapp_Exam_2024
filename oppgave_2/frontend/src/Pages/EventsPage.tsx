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
  waiting_list: boolean,
  full: boolean
}

let initialized = false;

const getEvents = async () => {
    const data = await ofetch(URLS.events)
    const events = data
    return events.data;
};
  
export default function Events() {
    const [typeValue, setTypeValue] = useState("");
    const [yearValue, setYearValue] = useState("");
    const [data, setData] = useState<Event[]>([]);
  
    const handleTypeFilter = async (event) => {
      const type = event.target.value;
      setTypeValue(type);
      
      const events = await getEvents();
      let filteredEvents = events;
      
      if (type && type.length > 0) {
        filteredEvents = filteredEvents.filter((event) =>
          event.type.toLocaleLowerCase().includes(type.toLowerCase())
        );
      }
      

        if (yearValue) {
          filteredEvents = filteredEvents.filter((event) => {
            try {
              let eventYear;
              if (typeof event.date === 'string') {
                eventYear = JSON.parse(event.date)['year'];
              } else if (typeof event.date === 'object') {
                eventYear = event.date['year'];
              } else {
                eventYear = new Date(event.date).getFullYear();
              }
              
              return eventYear.toString() === yearValue;
            } catch (error) {
              console.error('Error parsing date:', error);
              return false;
            }
          });
      }
      
      setData(filteredEvents);
    };
    //We were struggling to have date working, we had it showing, but not working, we used claude and he added a second filtering which allowed the code to work
    const handleYearFilter = async (event) => {
      const year = event.target.value;
      setYearValue(year);
      
      const events = await getEvents();
      let filteredEvents = events;
      
      if (typeValue && typeValue.length > 0) {
        filteredEvents = filteredEvents.filter((event) =>
          event.type.toLocaleLowerCase().includes(typeValue.toLowerCase())
        );
      }
      
      if (year) {
        filteredEvents = filteredEvents.filter((event) => {
          try {
            let eventYear;
            if (typeof event.date === 'string') {
              eventYear = JSON.parse(event.date)['year'];
            } else if (typeof event.date === 'object') {
              eventYear = event.date['year'];
            } else {
              eventYear = new Date(event.date).getFullYear();
            }
            
            return eventYear.toString() === year;
          } catch (error) {
            console.error('Error parsing date:', error);
            return false;
          }
        });
      }
      
      setData(filteredEvents);
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

    const currentYear = new Date().getFullYear();
    const years = Array.from(
      { length: 11 }, 
      (_, i) => currentYear - (10 - i)
    );
  
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
              value={typeValue}
              onChange={handleTypeFilter}
              className="min-w-[200px] rounded bg-slate-200">
              <option value="">All Events</option>
              {categories.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          
          <label htmlFor="yearfilter">
            <span>Year</span>
            <select
              id="yearfilter"
              name="yearfilter"
              value={yearValue}
              onChange={handleYearFilter}
              className="min-w-[100px] rounded bg-slate-200"
            >
              <option value="">All Years</option>
              {years.map(year => (
                <option key={year} value={year.toString()}>
                  {year}
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
                  <br/>
                  {JSON.parse(event.date)['day']} - {JSON.parse(event.date)['month']} - {JSON.parse(event.date)['year']}
                </h3>
                <p>
                  {event.description}
                  <br/>
                  Full: {event.full.toString()}
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