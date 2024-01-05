"use client";
import styled from 'styled-components';
import { trash } from '@/app/utils/icons';
import React, { useEffect, useState } from 'react'
import { useGlobalState } from '@/app/context/GlobalContextProvider';
import dateFormat from '@/app/utils/dateFormat';

interface Props {
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    id: string;
}


function TaskObject({title, description, date, isCompleted, id}: Props) {
    const {theme, deleteTask, updateTask} = useGlobalState();
    const [countdown, setCountdown] = useState(calculateCountdown(date));
    
    function calculateCountdown(date: string) {
        const taskDate = new Date(date);
        const currentDate = new Date();
        const diffInMilliseconds = taskDate.getTime() - currentDate.getTime();
    
        if (diffInMilliseconds < 0) {
            return { diffInDays: 0, hoursLeft: 0, minutesLeft: 0 };
        }
    
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
        const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
        const hoursLeft = diffInHours - (diffInDays * 24);
        const minutesLeft = diffInMinutes - (diffInHours * 60);
        return { diffInDays, hoursLeft, minutesLeft };
    }

    useEffect(() => {
        setCountdown(calculateCountdown(date));
    }, [date]);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => calculateCountdown(date));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
    <TaskItemStyle theme={theme}>
        <h1>{title}</h1>
        <p>{description}</p>
<div className='date-countdown'>
        <p className='date'>{dateFormat(date)}</p>
        <p className='countdown'>{countdown.diffInDays} days, {countdown.hoursLeft} hours, {countdown.minutesLeft} minutes</p>
</div>
        <div className="taskbtm">
            {isCompleted ?(
            <button className='completed' 
            onClick={() =>{
                const tasks = {
                    id,
                    isCompleted: !isCompleted,
                };
                updateTask(tasks);
            }}>Completed</button>) : (<button className='Incompleted'
            onClick={() =>{
                const tasks = {
                    id,
                    isCompleted: !isCompleted,
                };
                updateTask(tasks);
            }}
            >Incomplete</button>)}
            
            <button className="delete" onClick={() =>{
                deleteTask(id);
            }}>{trash}</button>
        </div>
    </TaskItemStyle>
    )
}

const TaskItemStyle = styled.div`
    padding: 1.2rem 1rem;
    border-radius: 1rem;
    min-height: 17rem;
    border: 2px solid ${(props) => props.theme.colorGrey4};
    box-shadow: ${(props) => props.theme.Shadow};
    background-color: ${(props) => props.theme.borderColor2};
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .date {
        margin-top: auto;
    }

   
    .date-countdown {
        font-size: 0.8rem; 
        background-color: ${(props) => props.theme.colorBg2};
        padding: 0.5rem; 
        border-radius: 0.5rem; 
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    > h1 {
        font-size: 1.5rem;
        font-weight: 600;
    }


    .taskbtm {
        display: flex;
        gap: 1.4rem;
        align-items: center;
    
    button {
        border: none;
        outline: none;
        cursor: pointer;
    
    i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};

        &:hover {
            opacity: 0.6;
            transition: all 0.55s ease;
            }
        }
    }
    .edit{
        margin-left: auto;
    }

    .completed, .Incompleted {
        display: inline-block;
        padding: 0.5rem 1rem;
        background: ${(props) => props.theme.colorBtnRed};
        border-radius: 1rem;

        &:hover {
            opacity: 0.6;
            transition: all 0.55s ease;
        }
    }

        .completed {
            background: ${(props) => props.theme.colorBtnGreen} !important;
        }
    }
}
`;

export default TaskObject