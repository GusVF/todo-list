// src/utils/renderWithRedux.tsx

import React from 'react';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import { legacy_createStore as createStore, combineReducers } from 'redux';
import { RootState } from 'src/redux/store';

import { todoReducer }from '../redux/reducers/todo.reducer';

function renderWithRedux(
  component: React.JSX.Element,
  state: RootState | undefined = undefined,
  store = createStore(combineReducers({ todoReducer }), state)
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
}

export default renderWithRedux;
