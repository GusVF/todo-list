export enum ConstantsEnum {
  FAKE_TIME_REQUEST = 1000,
  KEY_LOCAL_STORAGE = 'todos'
}

export enum StatusEnum {
  PENDING = 'pending',
  COMPLETED = 'concluded'
}

export enum ActionTypesEnum {
  ADD_TODO = 'addTodo',
  GET_ALL_TODOS = 'getAllTodos',
  UPDATE_TODO_STATUS = 'updateTodoStatus',
  DELETE_TODO = 'deleteTodo',
  UPDATE_TITLE_AND_DESCRIPTION = 'updateTitleAndDescription',
}