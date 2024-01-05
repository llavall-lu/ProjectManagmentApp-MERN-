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
    const [modal, setModal] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

const collapsedSidebar = () => {
    setCollapsed(!collapsed);
};


const allTasks = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get("/api/tasks");

        const sorted = response.data.sort((a, b) => {
            return(
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        });

        console.log(sorted);

        setTasks(sorted);
        console.log(response.data);
        setIsLoading(false);
        
        console.log(response.data);
    } catch (error) {
        console.log(error);
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

const updateTask = async (tasks) => {
    console.log(tasks)
    try {
        const response = await axios.put(`/api/tasks/`, tasks);
        toast.success("Task updated");

        allTasks();
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
    }
};

    const completedTasks = tasks.filter((tasks) => tasks.isCompleted === true);
    console.log(completedTasks);
    const importantTasks = tasks.filter((tasks) => tasks.isImportant === true);
    console.log(importantTasks);
    const incompleteTasks = tasks.filter((tasks) => tasks.isCompleted === false);
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
            updateTask,
            modal,
            openModal,
            closeModal,
            allTasks,
            collapsed,
            collapsedSidebar,
            }}>


            <GlobalUpdateContext.Provider value={{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);