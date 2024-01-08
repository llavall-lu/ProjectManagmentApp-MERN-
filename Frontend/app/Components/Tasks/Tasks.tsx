"use client";
import { useGlobalState } from '@/app/context/GlobalContextProvider'
import React from 'react'
import styled from 'styled-components'
import TaskObject from '../TaskObject/TaskObject';
import { plusA } from '@/app/utils/icons';
import CreateTask from '../modal/CreateTask';
import Modal from '../modal/Modal';


interface Props {
  title: string;
  tasks: any[];
}

function tasks({ title, tasks }: Props) {
    const {theme, isLoading, openModal, modal} = useGlobalState();

   // const isLoading = true; //TODO: uncomment this line to enable the loading spinner for testing

  return (
    <TaskStyle theme={theme}>
    {/* <CreateTask /> */}  //TODO: uncomment this line to enable the create task modal for testing

{modal && <Modal taskContent={<CreateTask />} />}
      <h1>{title}</h1>
    <div className="tasks grid">
      {tasks.map((task) => (
        <TaskObject 
          key={task.id}
          title={task.title}
          description={task.description}
          date={task.date}
          isCompleted={task.isCompleted}
          id={task.id}
        />
      ))}
      <button className="create-task" onClick={openModal}>
        {plusA}
        Add Task
      </button>
    </div> 

    </TaskStyle>
  );
}

const TaskStyle = styled.main`
    padding: 2rem;
    width: 100%;
    background-color: ${(props) => props.theme.colorBg2};
    border: 2px solid ${(props) => props.theme.borderColor2};
    border-radius: 1rem;
    height: 100%;

    overflow-y: auto;

    &webkit-scrollbar {
        width: 0.5rem;
    }

    .tasks{
      margin-top: 2rem;
    }

    > h1 {
      font-size: clamp(1.5rem, 2vw, 2rem);
      font-weight: 850;
      postion: relative;
    

    &::after {
      content: '';
      position: absolute;
      bottom: -1rem;
      left: 0;
      width: 3rem;
      height: 2px;
      background-color: ${(props) => props.theme.purple};
      border-radius: 1rem;
    }
  }
    .create-task {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        height: 17rem;
        border-radius: 1rem;
        border: 3px dashed ${(props) => props.theme.colorGrey5};
        transition: all 0.4s ease;
        font weight: 700;
        cursor: pointer;
        color: ${(props) => props.theme.colorGrey2};

        &:hover {
            background-color: ${(props) => props.theme.colorGrey5};
            color: ${(props) => props.theme.colorGrey2};
        }
    }


    

`



export default tasks