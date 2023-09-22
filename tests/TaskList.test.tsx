import React from 'react';
import '@testing-library/jest-dom';

import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../src/App';
import { StatusEnum } from '../src/enums/todo.enum';
import renderWithRedux from '../src/utils/renderWithRedux';

describe('TaskInput component Elements and it\'s functionalities', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Use fake timers
    renderWithRedux(<App />);
  });

  afterAll(() => {
    jest.useRealTimers(); // Switch back to real timers after all tests
  });

  test('Dropdown Status render and interaction', async () => {
    const selectStatus = screen.getByTestId('selectStatus') as HTMLSelectElement;
    expect((selectStatus as HTMLSelectElement).value).toBe('all');

    userEvent.selectOptions(selectStatus, [StatusEnum.PENDING]);
    await waitFor(() => {
    expect((selectStatus as HTMLSelectElement).value).toBe(StatusEnum.PENDING);
  });

    userEvent.selectOptions(selectStatus, [StatusEnum.COMPLETED]);
      await waitFor(() => {
      expect((selectStatus as HTMLSelectElement).value).toBe(StatusEnum.COMPLETED);
    });
});

  test('Dropdown Date Created render and interaction', async () => {
    const selectDateFilter = screen.getByTestId('selectDateFilter');
    
    expect((selectDateFilter as HTMLSelectElement).value).toBe('most-recent');
      
    userEvent.selectOptions(selectDateFilter, ['oldest']);
     await waitFor(() => {
      expect((selectDateFilter as HTMLSelectElement).value).toBe('oldest');
     });
    });

  test('The rendering and contents of a new task added', async () => {
    const titleInput = await screen.findByPlaceholderText('Add your List Title');
    const descriptionInput = await screen.findByPlaceholderText('Your task description here...');
    const addTaskButton = screen.getByRole('button', { name: 'Add a task' });

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(addTaskButton).toBeInTheDocument();

    userEvent.type(titleInput, 'My new task.');
    userEvent.type(descriptionInput, 'New task description.');
    userEvent.click(addTaskButton);

    const loadingElement = await screen.findByText('Loading...');
    expect(loadingElement).toBeInTheDocument();
    
    jest.runAllTimers(); 

    await waitFor(() => {
      expect(screen.getByTestId('containerList')).toBeInTheDocument();
      expect(screen.getByTestId('taskList')).toBeInTheDocument(); 
    });

    expect((titleInput as HTMLSelectElement).value).toBe('');
    expect((descriptionInput as HTMLSelectElement).value).toBe('');

  });
});