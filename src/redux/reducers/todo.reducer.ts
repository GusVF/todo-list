import { ActionTypesEnum } from '@/enums/todo.enum';

import { AnyAction } from 'redux';
import { GlobalStateType } from 'src/types/todo.type';

const INITIAL_STATE: GlobalStateType = {
    selectedTodo: null,
    todos: [],
    // fetching: false
};

export const todoReducer = (state = INITIAL_STATE, action: AnyAction) => {
  let updatedTodos;

  switch(action.type) {
    case ActionTypesEnum.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
      case ActionTypesEnum.GET_ALL_TODOS:
        return {
          ...state,
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
          todos: updatedTodos
        };
        case ActionTypesEnum.DELETE_TODO:
          return {
            ...state,
            todos: state.todos.filter(todo => todo.id !== action.payload.id)
          };
        case ActionTypesEnum.UPDATE_TITLE_AND_DESCRIPTION:
          return {
            ...state,
            todos: state.todos.map((todo) => 
            todo.id === action.payload.id 
            ? { ...todo,
            title: action.payload.title,
            description: action.payload.description } : todo)
          };
    default:
      return state;
  }
};