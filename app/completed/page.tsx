"use client";
import React from "react";
import { useGlobalState } from "../context/GlobalContextProvider";
import Tasks from "../Components/Tasks/Tasks";

// this function renders the Task component with the title Completed Tasks and the tasks that are completed
function page() {
  const { completedTasks } = useGlobalState();
  return <Tasks title="Completed Tasks" tasks={completedTasks} />;
}

export default page;
