"use client";

import { useGlobalState } from '@/app/context/GlobalContextProvider';
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import Button from '../Button/btn';
import { plus } from '@/app/utils/icons';

function CreateTask() {
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
const [time, setTime] = useState('00:00:00');
const [completed, setCompleted] = useState(false)
const [important, setImportant] = useState(false)
const {theme, allTasks, closeModal} = useGlobalState();
const [titleUError, setU3TitleError] = useState('');
const [NoDescriptionError, setNoDescriptionError] = useState('');
const [titleLengthOError, setO32TitleError] = useState('');
const [descriptionLengthUError, setO200DescriptionError] = useState('');
const [badDate, setBadDate] = useState('');

const handlechange =  (name: string) => (e: any) => {

    switch (name) {
        case 'title':
            setTitle(e.target.value)
            break;
        case 'description':
            setDescription(e.target.value)
            break;
        case 'date':
            setDate(e.target.value)
            break;
        case 'time': // Update the time when the time input changes
            setTime(e.target.value)
            break;
        case 'completed':
            setCompleted(e.target.checked)
            break;
        case 'important':
            setImportant(e.target.checked)
            break;
        default:
            break;
    }
};

const handleSubmit = async (e: any) => {
    console.log("handleSubmit called");
    e.preventDefault();

    if (title.length < 3) {
        console.log('Validation triggered');
        setU3TitleError('Title must be at least 3 characters long');
        toast.error('Title must be at least 3 characters long');
        return;
      } else {
        setU3TitleError('');
      }

      if (!description) {
        console.log('Validation triggered');
        setNoDescriptionError('Description is required');
        toast.error('Description is required');
        return;
    }else {
        setNoDescriptionError('');
    }

       if (title.length > 32) {
        setO32TitleError('Title must not exceed 32 characters');
        toast.error('Title must not exceed 32 characters');
        return;
    } else {
        setO32TitleError('');
    }

    // Description length validation
    if (description.length > 200) {
        setO200DescriptionError('Description must not exceed 200 characters');
        toast.error('Description must not exceed 200 characters');
        return;
    } else {
        setO200DescriptionError('');
    }



    const taskDateString = `${date}T${time}${new Date().getTimezoneOffset() < 0 ? '+' : '-'}${Math.abs(new Date().getTimezoneOffset() / 60).toString().padStart(2, '0')}:00`; 
    const taskDate = new Date(taskDateString);
    const currentDate = new Date();
    
    if (taskDate.getTime() <= currentDate.getTime() + 60000) {
        toast.error('Task must be at least 1 minute in the future');
        setBadDate("Task must be at least 1 minute in the future")
        return;
    }else{
        toast.success('Task created successfully');
        setBadDate("")
    }

    const task = {
        title,
        description,
        date: taskDate.toISOString(),
        completed,
        important
    };
    
    try {
        const response = await axios.post('/api/tasks', task); 

        if (response.data.error) {
            toast.error(response.data.error);
        }
        if (!response.data.error) {
            toast.success('Task created successfully');
            allTasks();
            closeModal();
        }
    }catch (error) {
        toast.error("Something went wrong");
        console.log(error);
    }
};


    return (
        <CreateTaskStyle onSubmit={handleSubmit} theme={theme} data-testid="create-task-form">
        <h1>Create a Task</h1>
        <div className="input-control">
            <label htmlFor="title">Title</label>
            <input type="text"
                id='title'
                value={title}
                name='title'
                onChange={handlechange('title')}
                placeholder='YES'
            />
            {titleUError && <p>{titleUError}</p>}
            {titleLengthOError && <p>{titleLengthOError}</p>}
        </div>
        
        <div className="input-control">
    <label htmlFor="description">Description</label>
    <textarea 
        value={description}
        id='description'
        name='description'
        onChange={handlechange('description')}
        rows={4}
        placeholder='YESDescription'
    />
    {NoDescriptionError && <p>{NoDescriptionError}</p>}
    {descriptionLengthUError && <p>{descriptionLengthUError}</p>}
</div>

        <div className="input-control">
            <label htmlFor="date">Date</label>
            <input 
            type="date"
                id='date'
                value={date}
                name='date'
                onChange={handlechange('date')}
                />
                {badDate && <p>{badDate}</p>}
            </div>

            <div className="input-control">
            <label htmlFor="time">Time</label>
            <input 
            type="time"
                id='time'
                value={time}
                name='time'
                onChange={handlechange('time')}
                step="1" 
                />
        </div>

            <div className="input-control checkbox">
                <label htmlFor="completed">Toggle Completed</label>
                <input 
                    type="checkbox"
                    id='completed'
                    checked={completed}
                    name='completed'
                    onChange={handlechange('completed')}
                    value={completed.toString()}
                />
            </div>

            <div className="input-control checkbox">
                <label htmlFor="important">Toggle Important</label>
                <input 
                    type="checkbox"
                    id='important'
                    checked={important}
                    name='important'
                    onChange={handlechange('important')}
                    value={important.toString()}
                />
            </div>
            <div className="submit-btn flex justify-end">
                <Button type='submit'
                    name='Create Task'
                    icon={plus}
                    padding='0.9rem 2rem'
                    borderRadius='0.5rem'
                    fontWeight='600'
                    fontSize='1.2rem'
                    background={theme.colorPurple}
                />
            </div>
    </CreateTaskStyle>
);
}

const CreateTaskStyle = styled.form`

> h1 {
    font-size: 1.3rem, 5vw, 1.6rem;
    font-weight: 600;
}


.input-control{
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;


    label {
        
        margin-bottom: 0.4rem;
        font-size: clamp 1rem. 5vw, 1.2rem;
        font-weight: 600;
        color: ${(props) => props.theme.colorGrey1};
    }

    input, textarea {
        width: 100%;
        border: 2px solid ${(props) => props.theme.colorGrey4};
        border-radius: 0.5rem;
        padding: 1rem;
        resize: none;
        background-color: ${(props) => props.theme.colorBg4};
    } 
}
.checkbox{
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: space-between;

    label { 
        flex: 1;
    }
    input {
        width: initial;
    }
}

`;


export default CreateTask;