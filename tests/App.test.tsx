import React from 'react';

import { screen } from '@testing-library/react';

import App from '../src/App';
import renderWithRedux from '../src/utils/renderWithRedux';

describe('Testing if App renders header on screen', () => {
  test('Verifies if header text is "Redux-thunk Task list"', () => {
    renderWithRedux(<App />);
    const headerText = screen.getByRole('heading', { name: /redux-thunk task list!/i });
    
    expect(headerText).toBeDefined();
  });
});