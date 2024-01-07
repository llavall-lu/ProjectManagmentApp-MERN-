// Mocking axios
jest.mock('axios', () => ({
  post: jest.fn(),
}));

// Mocking toast
jest.mock('react-hot-toast', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

// Mocking the Global State Context
const mockGlobalState = {
  theme: { colorBg2: '#fff', borderColor2: '#000', purple: '#800080', colorGrey5: '#d3d3d3', colorGrey2: '#808080'  },
  allTasks: jest.fn(),
  closeModal: jest.fn(),
};

jest.mock('../app/context/GlobalContextProvider.js', () => ({
  useGlobalState: () => mockGlobalState,
}));

import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import CreateTask from '@/app/Components/modal/CreateTask';
import axios from 'axios';
import { toast } from 'react-hot-toast';

describe('CreateTask Component Validation Tests', () => {
  it('displays error if title is less than 3 characters', () => {
    render(<CreateTask />);
    const titleInput = screen.getByLabelText('Title');
    fireEvent.change(titleInput, { target: { value: 'Yo' } });
    const submitButton = screen.getByRole('button', { name: /Create Task/i });
    fireEvent.click(submitButton);
    expect(screen.getByText('Title must be at least 3 characters long')).toBeInTheDocument();
  });

  it('displays error if description is empty', () => {
    render(<CreateTask />);
    const titleInput = screen.getByLabelText('Title');
    // Provide a valid title
    fireEvent.change(titleInput, { target: { value: 'Valid Title' } });
    const descriptionInput = screen.getByLabelText('Description');
    // Set description to empty
    fireEvent.change(descriptionInput, { target: { value: '' } });
    const submitButton = screen.getByRole('button', { name: /Create Task/i });
    fireEvent.click(submitButton);
    expect(screen.getByText('Description is required')).toBeInTheDocument();
  });

  
  it('displays error if title exceeds 32 characters', () => {
    render(<CreateTask />);
    const titleInput = screen.getByLabelText('Title');
    fireEvent.change(titleInput, { target: { value: 'a'.repeat(33) } });
  
    const descriptionInput = screen.getByLabelText('Description');
    fireEvent.change(descriptionInput, { target: { value: 'Valid Description' } }); // Ensure valid description
  
    const submitButton = screen.getByRole('button', { name: /Create Task/i });
    fireEvent.click(submitButton);
    expect(screen.getByText('Title must not exceed 32 characters')).toBeInTheDocument();
  });

  it('displays error if description exceeds 200 characters', () => {
    render(<CreateTask />);
    const titleInput = screen.getByLabelText('Title');
    // Provide a valid title
    fireEvent.change(titleInput, { target: { value: 'Valid Title' } });
    const descriptionInput = screen.getByLabelText('Description');
    // Setting description to 201 characters
    fireEvent.change(descriptionInput, { target: { value: 'a'.repeat(201) } });
    const submitButton = screen.getByRole('button', { name: /Create Task/i });
    fireEvent.click(submitButton);
    expect(screen.getByText('Description must not exceed 200 characters')).toBeInTheDocument();
  });
  
  it('displays error if title exceeds 32 characters', () => {
    render(<CreateTask />);
    const titleInput = screen.getByLabelText('Title');
    fireEvent.change(titleInput, { target: { value: 'Valid Title' } });
  
    const descriptionInput = screen.getByLabelText('Description');
    fireEvent.change(descriptionInput, { target: { value: 'Valid Description' } }); // Ensure valid description

    const dateInput = screen.getByLabelText('Date');
    fireEvent.change(dateInput, { target: { value: '2020-01-07' } });   
  
    const submitButton = screen.getByRole('button', { name: /Create Task/i });
    fireEvent.click(submitButton);
    expect(screen.getByText('Task must be at least 1 minute in the future')).toBeInTheDocument();
  });
  
});