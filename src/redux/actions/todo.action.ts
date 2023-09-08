import { ActionTypesEnum } from '@/enums/todo.enum';

import { NewTodoType, TodoType } from 'src/types/todo.type';

import { createNewTodo, getTodosStorage } from '../../requests/index';
import { Dispatch } from '../../types/dispatch';

// Action creators
export const addTodo = (todo: NewTodoType) => ({
  type: ActionTypesEnum.ADD_TODO,
  payload: todo,
});

// Create setLoading action creator
const setLoading = () => ({
    type: ActionTypesEnum.SET_LOADING,
});

// getAll todos action creator
export const getAllTodos = (todos: TodoType[]) => ({
    type: ActionTypesEnum.GET_ALL_TODOS,
    payload: todos,
});

// Create redux thunk
export const addNewTodo = (todo: NewTodoType) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading());
    const response = await createNewTodo(todo);
    dispatch(addTodo(response));
  };
};

// getTodos redux thunk
export const getTodos = () => {
    return async (dispatch: Dispatch) => {
      dispatch(setLoading());
      const response = await getTodosStorage();
      dispatch(getAllTodos(response));
    };
  };
