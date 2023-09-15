import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ActionTypesEnum, StatusEnum } from '@/enums/todo.enum';

import { TodoType, UpdateTodoType } from '@/types/todo.type';

import { getAllTodos } from '../redux/actions/todo.action';
import { RootState } from '../redux/store';
import '../styles/TaskList.css';
import { deleteTodo, updateTodo } from '../requests/request';
import { Dispatch } from '../types/dispatch';
import LoadingPopup from './Loading';

const TaskList: React.FC = () => {
  const dispatch: Dispatch = useDispatch();

  // const todos = useSelector((state: RootState) => state.todoReducer.todos);
  const { todoReducer: { todos } } = useSelector((state: RootState) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<StatusEnum | 'all'>('all');

  useEffect(() => {
    setIsLoading(false);
    // Fetch todos from storage and dispatch them to the Redux store
   dispatch(getAllTodos());

  }, [dispatch]);

  const handleStatusTaskUpdate = async (todoId: number) => {
    try {
      setIsLoading(true);
      // Fetch the current todo from your Redux store or wherever you have it
      const currentTodo = todos.find((todo: TodoType) => todo.id === todoId);
  
      if (!currentTodo) {
        // Handle the case where the todo with the specified id is not found
        console.error(`Todo with id ${todoId} not found.`);
        return;
      }
  
      // Create an UpdateTodoType object based on the current todo
      const updatedTodo: UpdateTodoType = {
        ...currentTodo,
        status: StatusEnum.COMPLETED,
      };
  
      // Use the updateTodo function to update the todo in localStorage
      const updatedTodos = await updateTodo(updatedTodo);
  
      // Dispatch an action to update the task list with the updated data
      dispatch({
        type: ActionTypesEnum.GET_ALL_TODOS,
        payload: updatedTodos,
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating task status:', error);
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (todoId : number) => {
    try {
      setIsLoading(true);
      const updatedTodos = await deleteTodo(todoId);
      // Dispatch an action to update the task list with the updated data in Redux
      dispatch({
        type: ActionTypesEnum.GET_ALL_TODOS,
        payload: updatedTodos,
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error deleting task:', error);
      setIsLoading(false);
    }
  };

  const filterTodoType: TodoType[] = selectedStatus === 'all' ?
  todos: todos.filter((todo: TodoType) => todo.status === selectedStatus);
  
return (
  <div className="containerList
   is-flex
   is-align-items-flex-start">
    <select
    className="selectStatus mt-4 mr-6"
    value={selectedStatus}
    onChange={(e) => setSelectedStatus(e.target.value as StatusEnum)}
    >
      <option value="all">All</option>
      <option value={StatusEnum.PENDING}>Pending</option>
      <option value={StatusEnum.COMPLETED}>Complete</option>
    </select>
    <div className="task-list-container
   is-flex
   is-flex-direction-column
   is-align-items-center
   mt-4">
      <LoadingPopup trigger={isLoading} />
      <ul className="task-list">
        {filterTodoType.map((todo: TodoType) => (
          <li key={todo.id} className="printedList">
            <div className="list-content">
              <div className="task-buttons">
                <button
              type="submit"
              className="button is-light is-rounded"
              onClick={() => handleStatusTaskUpdate(todo.id)}
            >
                  <span className={todo.status === StatusEnum.PENDING ?
              'has-text-danger icon-text': 'has-text-success icon-text'}>
                    <span className="icon">
                      {todo.status === StatusEnum.PENDING ? (
                        <i className="fas fa-ban"></i>
                  ) : (
                    <i className="fas fa-check"></i>
                  )}
                    </span>
                    <span>{todo.status === StatusEnum.PENDING ? 'not done' : 'Done'}</span>
                  </span>
                </button>
                <button
              className="button is-light is-danger is-rounded ml-6"
              onClick={() => handleDeleteTask(todo.id)}
            >
                  <span className="icon is-small">
                    <i className="fa-solid fa-trash"></i>
                  </span>
                </button>
              </div>
              <div className="task-details">
                <h3 className="mt-3">
                  Task title: 
                  {' '}
                  {todo.title}
                </h3>
                <p>
                  Description: 
                  {' '}
                  {todo.description}
                </p>
                {/* If you want to display the date, uncomment the following line */}
                {/* <p>
              Date: 
              {' '}
              {todo.date}
            </p> */}
              </div>
            </div>
          </li>
    ))}
      </ul>
    </div>
  </div>
);
};

export default TaskList;
