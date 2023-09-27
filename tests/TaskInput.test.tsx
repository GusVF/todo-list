import React from 'react';
import '@testing-library/jest-dom';

import { screen, } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
 
import App from '../src/App';
import renderWithRedux from '../src/utils/renderWithRedux';

  // Mocking localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

beforeEach(() => {
  jest.useFakeTimers();
  // Any other setup you might need before each test
});

afterEach(() => {
  jest.clearAllMocks();  // Clear any mocked calls/data
  jest.runOnlyPendingTimers();  // In case there are any pending timers
  jest.useRealTimers();  // Switch back to real timers after each test
});

describe('TaskInput component Elements and it\'s functionalities', () => {
  beforeEach(() => {
    renderWithRedux(<App />);
 });

  test('Title input functionality', async () => {
    const titleInput = await screen.findByPlaceholderText('Add your List Title');
    expect(titleInput).toBeInTheDocument();
    
    userEvent.type(titleInput, 'My new task');

    // Manually trigger the onChange event
    fireEvent.change(titleInput, { target: { value: 'My new task' } });

    expect((titleInput as HTMLInputElement).value).toBe('My new task');
});

  test('Description input functionality', async () => {
    const descriptionInput = await screen.findByPlaceholderText('Your task description here...');
    expect(descriptionInput).toBeInTheDocument();

    // userEvent.type(descriptionInput, 'My new task description');

    fireEvent.change(descriptionInput, { target: { value: 'My new task description' } });

    expect((descriptionInput as HTMLInputElement).value).toBe('My new task description');
  });

// Tests the input writing, the button click and and the clearing of the input after
// Loading... sets to false (which is handled in local state.).
// After these evens we the tests events will happen in the TaskList.test.tsx.
// See you there...
  test('Add task button functionality', async () => {
    const titleInput = await screen.findByPlaceholderText('Add your List Title');
    const descriptionInput = await screen.findByPlaceholderText('Your task description here...');
    const addTaskButton = screen.getByRole('button', { name: 'Add a task' });

    expect(addTaskButton).toBeInTheDocument();

    userEvent.type(titleInput, 'My new task');
    userEvent.type(descriptionInput, 'My new task description');
    userEvent.click(addTaskButton);

    const loadingElement = await screen.findByText('Loading...');
    expect(loadingElement).toBeInTheDocument();
    
    expect((titleInput as HTMLInputElement).value).toBe('');
    // // Now, you can check for the expected outcomes without waiting
    expect((descriptionInput as HTMLInputElement).value).toBe('');
  });
});