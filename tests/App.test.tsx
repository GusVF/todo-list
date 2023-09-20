import React from 'react';

import { screen } from '@testing-library/react';

import App from '../src/App';
import renderWithRedux from '../src/utils/renderWithRedux';

//  I had some issued when trying to configure Vitest and Jest so 
//  I had to change some of the assertions. ex: Can't use .toBeInTheDocument
//  because typeScript does not seems to recognize it for some reason. 

// These test cover only the rendering of the components in App. 

describe('Testing if App renders header on screen', () => {
  beforeEach(() => {
    renderWithRedux(<App />);
  });

  test('Verifies if header text is "Redux-thunk Task list"', () => {
    const headerText = screen.getByRole('heading', { name: /redux-thunk task list!/i });
    
    expect(headerText).toBeDefined();
  });

  test('Checks if taskInput component renders correctly', () => {
    const titleInput = screen.getByPlaceholderText('Add your List Title');
    const descriptionInput = screen.getByPlaceholderText('Your task description here...');
    const addTaskButton = screen.getByRole('button', { name: 'Add a task' });

    expect(titleInput).toBeDefined();
    expect(descriptionInput).toBeDefined();
    expect(addTaskButton).toBeDefined();
  });

  test('Checks if taskList component renders correctly', () => {

    const optionAll = screen.getByRole('option', { name: /All/i });
    const optionMostRecent = screen.getByRole('option', { name: /Most Recent/i });
    const taskListContainer = screen.getByTestId('containerList');

    expect(optionAll).toBeDefined();
    expect(optionMostRecent).toBeDefined();
    expect(taskListContainer).toBeDefined();
  });
});