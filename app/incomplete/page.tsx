"use client";
import React from "react";
import { useGlobalState } from "../context/GlobalContextProvider";
import Tasks from "../Components/Tasks/Tasks";

function page() {
  const { incompleteTasks } = useGlobalState();
  return <Tasks title="Completed Tasks" tasks={incompleteTasks} />;
}

export default page;
