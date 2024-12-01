"use client"


import React from "react";
import Layout from "@/layout/Layout";
import Project from "@/components/Projects";
import useProjects from "../hooks/useProjects"; 
// import { useEffect, useState } from "react";
import type { HandleProject, Project as ProjectType } from "@/components/Types";
// import useProjectForm from "../hooks/useProjectForm";

export default function FrontPage() {
  const { add, remove, update, status, get, data, error } = useProjects();
  const projects = data;

  const handleProjectMutation: HandleProject = (props) => {
    const { action } = props;

    switch (action) {
      case "add":
        add(props.project);
        break;
      case "remove":
        remove(props.id);
        break;
      case "update":
        update(props.id, props.project);
        break;
      default:
        break;
    }
  };

  const addProjectServer = async (id: string) => {
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
        projects={projects}
        handleProjectMutation={handleProjectMutation}
      >
      </Project>
      </Layout>
    </>
  )
}