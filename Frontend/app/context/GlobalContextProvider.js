"use client";
import React, { createContext, useState, useContext } from "react";
import  themes  from "./themes";
import axios from 'axios';


export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();



export const GlobalProvider = ({ children }) => {

    const [selectedTheme, setSelectedTheme] = useState(0);
    const theme = themes[selectedTheme];
    const [isLoading, setIsLoading] = useState(false);
    const [tasks, setTasks] = useState([]);

const allTasks = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get("/api/tasks");

        setTasks(response.data);
        setIsLoading(false);
        
        console.log(response.data);
    } catch (error) {
        console.error(error.response.data); // Log the server's response
        console.error(error.response.status); // Log the status code
        console.error(error.response.headers); // Log the headers
    }
};

    React.useEffect(() => {
        allTasks();
    }, []);

    return (
        <GlobalContext.Provider value={{
            theme,
            tasks,
            }}>
            <GlobalUpdateContext.Provider value={{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);