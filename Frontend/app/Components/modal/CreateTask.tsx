"use client";

import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

function CreateTask() {
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [date, setDate] = useState('')
const [completed, setCompleted] = useState(false)
const [important, setImportant] = useState(false)
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
    e.preventDefault();

    const task = {
        title,
        description,
        date,
        completed,
        important
    };
    
    try {
        const res = await axios.post('/api/tasks', task); 

        if (res.data.error) {
            toast.error(res.data.error);
        }
        toast.success("Task created successfully");
    }catch (error) {
        toast.error("Something went wrong");
        console.log((error as any).response);
    }
};


  return (
    <form onSubmit={handleSubmit}>
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
            ></textarea>
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
            </div>

            <div className="input-control">
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

            <div className="input-control">
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
            <div className="submit-btn">
                <button type="submit"><span>Submit</span></button>
            </div>
    </form>
  );
}

export default CreateTask