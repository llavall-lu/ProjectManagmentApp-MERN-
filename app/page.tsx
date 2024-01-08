"use client";
import Tasks from "./Components/Tasks/Tasks";
import { useGlobalState } from "./context/GlobalContextProvider";

export default function Home() {
  const { tasks } = useGlobalState();
  return <Tasks title="Tasks" tasks={tasks} />;
}
