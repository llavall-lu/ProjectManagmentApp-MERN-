"use client";
import React, { createContext, useState, useContext } from "react";
import  themes  from "./themes";
import axios from 'axios';
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";


export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();



export const GlobalProvider = ({ children }) => {
    const { user } = useUser();

    const [selectedTheme, setSelectedTheme] = useState(0);
    const theme = themes[selectedTheme];
    const [isLoading, setIsLoading] = useState(false);
    const [tasks, setTasks] = useState([]);

const allTasks = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get("/api/tasks");

        setTasks(response.data);
        console.log(response.data);
        setIsLoading(false);
        
        console.log(response.data);
    } catch (error) {
        console.error(error.response.data); // Log the server's response
        console.error(error.response.status); // Log the status code
        console.error(error.response.headers); // Log the headers
    }
};

const deleteTask = async (id) => {
    try {
        const response = await axios.delete(`/api/tasks/${id}`);
        toast.success("Task deleted");

        allTasks();
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
    }
    };

    const completedTasks = tasks.filter((task) => task.isCompleted === true);
    console.log(completedTasks);
    const importantTasks = tasks.filter((task) => task.isImportant === true);
    console.log(importantTasks);
    const incompleteTasks = tasks.filter((task) => task.isCompleted === false);
    console.log(incompleteTasks);

    React.useEffect(() => {
        if (user) allTasks();
    }, [user]);

    return (
        <GlobalContext.Provider value={{
            theme,
            tasks,
            deleteTask,
            isLoading,  
            completedTasks,
            importantTasks,
            incompleteTasks,
            }}>


            <GlobalUpdateContext.Provider value={{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);