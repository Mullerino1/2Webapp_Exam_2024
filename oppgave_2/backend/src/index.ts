import app from "./app";
import { port } from "./config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { PrismaClient } from '@prisma/client'
import { date, z } from "zod"

const eventslink = "/events"
const customerslink = "/customers"

console.log(`Server is running on port ${port}`);

const prisma = new PrismaClient()

serve({
  fetch: app.fetch,
  port,
});

// Courses

app.get(eventslink, async (c) => {
  try {
    const events = await prisma.events.findMany();

    if (events.length > 0) {
      return c.json({ success: true, data: events }, 200);
    } else {
      return c.json({ success: true, data: [] }, 204); // Return empty array if no courses
    }
  } catch (err) {
    console.error(`Error writing to database`, err);
    return c.json({ success: false, error: `Error writing to database: ` + err }, 500);
  }
});

app.post(eventslink, async (c) => {
  const event = await c.req.json();  
  const eventData = {
  title: event['title'],
  description: event['description'],
  slug: event['slug'],
  date :event['date'],
  location : event['location'],
  type: event['type'],
  seats: event ['seats'],
  waiting_list: event ['waiting_list']
  }
  
  try {
    const newEvent = await prisma.events.create({
      data: {
        id: `${Date.now()}`,
        title: event.title,
        slug: event.slug,
        date: event.date,
        location: event.location,
        type: event.type,
        seats: event.seats,
        waiting_list: event.waiting_list
      }
    })  

    console.log('Insert Successful');
  } catch (err) {
    console.error(`Error adding:`, err);
    return c.json({success: false, error: `Failed adding`}, 500);
  }

  return c.json({success: true, message: `Successfully created the new course`}, 201);
});

app.post(customerslink, async (c) => {
  const customer = await c.req.json();  
  console.log(customer)
  const customerData = {
  name: customer['name'],
  phonenumber: customer['phonenumber'],
  email: customer['email'],
  event_id: customer['event_id']
  }
  console.log(customerData)
  try {
    
    const newUsers = await prisma.customers.create({
      data: {
        name: customerData.name,
        phonenumber: customerData.phonenumber as string,
        email: customerData.email,
        event_id: customerData.event_id,
        approved: "Waiting"
      }
    })
  

    console.log('Insert Successful');
  } catch (err) {
    console.error(`Error adding:`, err);
    return c.json({success: false, error: `Failed adding`}, 500);
  }

  return c.json({success: true, message: `Successfully created the new customer`}, 201);
});