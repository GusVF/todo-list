import React from 'react';
import '@testing-library/jest-dom';

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../src/App';
import { StatusEnum } from '../src/enums/todo.enum';
import renderWithRedux from '../src/utils/renderWithRedux';

describe('TaskInput component Elements and it\'s functionalities', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    renderWithRedux(<App />);

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
    
      const testTitle = 'My new task.';
      const testDescription = 'New task description.';
    
      userEvent.type(titleInput, testTitle);
      userEvent.type(descriptionInput, testDescription);
      userEvent.click(addTaskButton);
    
      const loadingElement = await screen.findByText('Loading...');
      expect(loadingElement).toBeInTheDocument();
    
      jest.runAllTimers();
    
      // Wait for a short period of time to allow component to re-render
      await waitFor(() => {
        expect(screen.getByTestId('containerList')).toBeInTheDocument();
        expect(screen.getByTestId('taskList')).toBeInTheDocument();

      });
    });    
});