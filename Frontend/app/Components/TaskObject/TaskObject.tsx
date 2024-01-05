"use client";
import styled from 'styled-components';
import { trash,edit } from '@/app/utils/icons';
import React from 'react'
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
    return (
    <TaskItemStyle theme={theme}>
        <h1>{title}</h1>
        <p>{description}</p>
        <p className='date'>{dateFormat(date)}</p>
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
            <button className="edit">{edit}</button>
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
    height: 17rem;
    border: 2px solid ${(props) => props.theme.colorGrey4};
    box-shadow: ${(props) => props.theme.Shadow};
    background-color: ${(props) => props.theme.borderColor2};
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .date {
        margin-top: auto;
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