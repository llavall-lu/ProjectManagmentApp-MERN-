"use client";
import React from "react";
import { useGlobalState } from "../context/GlobalContextProvider";
import Tasks from "../Components/Tasks/Tasks";

function page() {
  const { importantTasks } = useGlobalState();
  return <Tasks title="Completed Tasks" tasks={importantTasks} />;
}

export default page;
