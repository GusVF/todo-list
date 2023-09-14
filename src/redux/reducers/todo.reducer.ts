import { ActionTypesEnum } from '@/enums/todo.enum';

import { AnyAction } from 'redux';
import { GlobalStateType } from 'src/types/todo.type';

const INITIAL_STATE: GlobalStateType = {
    selectedTodo: null,
    todos: [],
    // fetching: false
};

export const todoReducer = (state = INITIAL_STATE, action: AnyAction) => {
  let updatedTodos; // Declare updatedTodos here

  switch(action.type) {
    // case ActionTypesEnum.SET_LOADING:
    //   return {
    //     ...state,
    //     fetching: false,
    //   };
    case ActionTypesEnum.ADD_TODO:
      return {
        ...state,
        fetching: false,
        todos: [...state.todos, action.payload],
      };
      case ActionTypesEnum.GET_ALL_TODOS:
        return {
          ...state,
          fetching: false,
          todos: action.payload,
        };
      case ActionTypesEnum.UPDATE_TODO_STATUS:
        updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.todoId
          ? { ...todo, status: action.payload.newStatus }
          : todo
      );
        return {
          ...state, 
          fetching: false,
          todos: updatedTodos
        };
        case ActionTypesEnum.DELETE_TODO:
          return {
            ...state,
            fetching: false,
            todos: state.todos.filter(todo => todo.id !== action.payload.id)
          };
    default:
      return state;
  }
};