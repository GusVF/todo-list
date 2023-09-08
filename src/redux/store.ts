import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { todoReducer } from './reducers/todo.reducer';

const rootReducer = combineReducers({
  todoReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
