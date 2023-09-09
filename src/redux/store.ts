import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { todoReducer } from './reducers/todo.reducer';

const rootReducer = combineReducers({
  todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState here

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
