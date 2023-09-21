import React from 'react';
import '@testing-library/jest-dom';

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../src/App';
import { StatusEnum } from '../src/enums/todo.enum';
import renderWithRedux from '../src/utils/renderWithRedux';

describe('TaskInput component Elements and it\'s functionalities', () => {
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
});