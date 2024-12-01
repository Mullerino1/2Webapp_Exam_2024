"use client"


import React from "react";
import Layout from "@/layout/Layout";
import Project from "@/components/Tickets";
import useTicket from "../hooks/useTickets"; 
// import { useEffect, useState } from "react";
import type { HandleProject, Ticket as ProjectType } from "@/components/Types";
// import useProjectForm from "../hooks/useProjectForm";

export default function FrontPage() {
  const { add, status, get, data, error } = useTicket();
  const tickets = data;

  const handleProjectMutation: HandleProject = (props) => {
    const { action } = props;

    switch (action) {
      case "add":
        add(props.ticket);
        break;
    //   case "remove":
    //     remove(props.id);
    //     break;
    //   case "update":
    //     update(props.id, props.ticket);
    //     break;
    //   default:
    //     break;
    }
  };

  const addTicketServer = async (id: string) => {
    try {
      return fetch("http://localhost:3000", {
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