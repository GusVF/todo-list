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

  const todos = useSelector((state: RootState) => state.todoReducer.todos);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<StatusEnum | 'all'>('all');
  const [selectedDateFilter, setSelectedDateFilter] = useState<'most-recent' | 'oldest'>(
    'most-recent'
  );
  const [currentTodo, setCurrentTodo] = useState<TodoType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
   dispatch(getAllTodos());

  }, [dispatch]);

  const handleStatusTaskUpdate = async (todoId: number) => {
    try {
      setIsLoading(true);
      // Fetch the current todo from your Redux store or wherever you have it
      const currentTodo = todos.find((todo: TodoType) => todo.id === todoId);

      const newStatus = currentTodo.status === StatusEnum.PENDING ? 
      StatusEnum.COMPLETED : StatusEnum.PENDING;
  
      // Create an UpdateTodoType object based on the current todo
      const updatedTodo: UpdateTodoType = {
        ...currentTodo,
        status: newStatus,
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

  // Function that filters by Date.
  const filterDateTodos = () => {
    const sortedTodos = [...todos];
    if (selectedDateFilter === 'most-recent') {
      sortedTodos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (selectedDateFilter === 'oldest') {
      sortedTodos.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    return sortedTodos;
  };
  
  // Apply the date filter directly to todos before applying the status filter
  const filteredTodos = filterDateTodos().filter((todo: TodoType) => {
    if (selectedStatus === 'all') {
      return true; // Include all todos when status filter is 'all'
    } 
      return todo.status === selectedStatus;
    
  });

   // Handle input change that can be used in other codes. 
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setEditTitle(value); // Updated to setEditTitle
    } else if (name === 'description') {
      setEditDescription(value); // Updated to setEditDescription
    }
  };

  const handleEditTitleAndDescriptionBtn = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, todoId: number) => {
    event.preventDefault();
    setIsModalOpen(true);

    const foundTodo = todos.find((todo: TodoType) => todo.id === todoId);
    if (foundTodo) {
      setCurrentTodo(foundTodo); // Set currentTodo here
      setEditTitle(foundTodo.title);
      setEditDescription(foundTodo.description);
    }
  };

  const handleEditTitleAndDescriptionDiv = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, todoId: number) => {
    event.preventDefault();

    const currentTodo = todos.find((todo: TodoType) => todo.id === todoId);
    if (currentTodo) {
      setCurrentTodo(currentTodo);
      setEditTitle(currentTodo.title);
      setEditDescription(currentTodo.description);
      
      dispatch({
        type: ActionTypesEnum.UPDATE_TITLE_AND_DESCRIPTION,
        payload: {
          id: currentTodo.id,
          title: editTitle,
          description: editDescription,
        },
      });
       // Update localStorage with the edited todo
       const updatedTodoForLocalStorage = {
        ...currentTodo,
        title: editTitle,
        description: editDescription,
      };
      updateTodo(updatedTodoForLocalStorage);

      setIsModalOpen(false);
    }
  };

return (
  <div className="containerList
   is-flex
   is-align-items-flex-start"
   data-testid="containerList">
    <div className={`modal has-text-white ${isModalOpen ? 'is-active' : ''}`}>
      <div className="modal-background" 
      onClick={(e) => handleEditTitleAndDescriptionDiv(e, currentTodo?.id || 0)}></div>

      <div className="modal-content">
        <p>Edit your title here!</p>
        <input className="input modalInput mb-6"
         type="text"
         name="title"
         value={editTitle}
         onChange={handleInputChange}
         placeholder="New title..."
         />
        <p>Edit your description here!</p>
        <input className="input modalInput" 
        type="text"
        name="description"
        value={editDescription}
        onChange={handleInputChange}
        placeholder="New description..."
        />
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={() => setIsModalOpen(false)}></button>

    </div>
    <div>
      <select
    data-testid="selectStatus"
    className="selectStatus mt-4 mr-6"
    value={selectedStatus}
    onChange={(e) => setSelectedStatus(e.target.value as StatusEnum)}
    >
        <option value="all">All</option>
        <option value={StatusEnum.PENDING}>Pending</option>
        <option value={StatusEnum.COMPLETED}>Complete</option>
      </select>
      <select
    data-testid="selectDateFilter"
    className="selectDate mb-4"
    value={selectedDateFilter}
    onChange={(e) => setSelectedDateFilter(e.target.value as 'most-recent' | 'oldest')}
  >
        <option value="most-recent">Most Recent</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
    <div className="task-list-container
   is-flex
   is-flex-direction-column
   is-align-items-center
   mt-4">
      <LoadingPopup trigger={isLoading} />
      <ul className="task-list">
        {filteredTodos.map((todo: TodoType) => (
          <li key={todo.id} className="printedList">
            <div className="list-content">
              <div className="task-buttons">
                <button
                    data-testid="statusButton"
                    type="submit"
                    className="button is-light is-rounded"
                    onClick={() => handleStatusTaskUpdate(todo.id)}
                  >
                  <span className={
                      todo.status === StatusEnum.PENDING ? 'has-text-danger icon-text' : 'has-text-success icon-text'}>
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
                <button 
                className="button is-light is-rounded ml-6"
                onClick={(e) => handleEditTitleAndDescriptionBtn(e, todo.id)}
                >
                  Edit
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
                <p>
                  Date:
                  {' '}
                  {todo.date}
                </p>
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
