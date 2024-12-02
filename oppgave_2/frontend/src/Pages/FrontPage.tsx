"use client"


import React from "react";
import Layout from "@/layout/Layout";
import Project from "@/components/Tickets";
import useTicket from "../hooks/useTickets"; 
import type { HandleProject, Ticket as ProjectType } from "@/components/Types";

export default function FrontPage() {
  const { add, data } = useTicket();
  const tickets = data;

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
  };

 

  return (
    <>
    <Layout>
       <Project
        tickets={tickets}
        handleProjectMutation={handleProjectMutation}
      >
      </Project>
      </Layout>
    </>
  )
}