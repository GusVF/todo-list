import { ActionTypesEnum } from '@/enums/todo.enum';

import { NewTodoType } from 'src/types/todo.type';

import { createNewTodo } from '../../requests/index';
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

// Create redux thunk
export const addNewTodo = (todo: NewTodoType) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading());
    try {
      const response = await createNewTodo(todo);
      dispatch(addTodo(response)); // Dispatch the action using the action creator
    } catch (error) {
      console.log(error, 'Error todo.action.ts');
    }
  };
};
