import { ActionTypesEnum } from '@/enums/todo.enum';

import { NewTodoType, TodoType } from 'src/types/todo.type';

import { createNewTodo, deleteTodo, getTodosStorage } from '../../requests/request';
import { Dispatch } from '../../types/dispatch';

// // Action creators
// export const setLoading = () => ({
//   type: ActionTypesEnum.SET_LOADING,
// });

export const addTodo = (todo: TodoType) => ({
  type: ActionTypesEnum.ADD_TODO,
  payload: todo,
});

export const getAllTodos = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await getTodosStorage();
      dispatch({
        type: ActionTypesEnum.GET_ALL_TODOS,
        payload: response,
      });
    } catch (error) {
      console.log(error, 'Error todo.action.ts');
    }
  };
};

export const addNewTodo = (todo: NewTodoType) => {
  return async (dispatch: Dispatch) => {
    // dispatch(setLoading());
    try {
      const response = await createNewTodo(todo);
      dispatch(addTodo(response)); // Dispatch the action using the action creator
      return response; // Return the response
    } catch (error) {
      console.error('Error todo.action.ts', error);
      throw error; // Throw the error to be caught in your component
    }
  };
};

export const upDateTodoStatus = (todoId: number, newStatus: string) => ({
  type: ActionTypesEnum.UPDATE_TODO_STATUS,
  payload: {
    todoId,
    newStatus,
  }
});

// Function that deletes a todo from the state
export const deleteTodoAction = (todoId: number) => {
  return async (dispatch: Dispatch) => {
    // dispatch(setLoading());
    try {
      const response = await deleteTodo(todoId);
      dispatch({
        type: ActionTypesEnum.DELETE_TODO,
        payload: response,
      });
    } catch (error) {
      console.error('Error todo.action.ts', error);
      throw error; // Throw the error to be caught in your component
    }
  };
};