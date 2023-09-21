import React, { useState } from 'react';
import '../styles/TaskInput.css';
import { useDispatch } from 'react-redux';

import { StatusEnum } from '@/enums/todo.enum';

import { addNewTodo } from '@/redux/actions/todo.action';
import { Dispatch } from '@/types/dispatch';
import { NewTodoType } from '@/types/todo.type';

import LoadingPopup from './Loading';

const taskInput: React.FC = () => {
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch: Dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    if (name === 'title') {
      setTitleInput(value);
    } else if (name === 'description') {
      setDescriptionInput(value);
    }
  };

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (titleInput.trim() !== '' || descriptionInput.trim() !== '') {
      const newTodoData: NewTodoType = {
        title: titleInput,
        description: descriptionInput,
        status: StatusEnum.PENDING,
        date: new Date().toISOString(),
      };

      try {
        // Add the newTodo to the Redux store and get the response
       await addNewTodo(newTodoData)(dispatch);

        // Clear the input fields
        setTitleInput('');
        setDescriptionInput('');
        setIsLoading(false);

        // Handle the response as needed
      } catch (error) {
        console.error('Error adding todo', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      {/* Conditionally render the LoadingPopup component */}
      <LoadingPopup trigger={isLoading}/>
      <form onSubmit={handleAddTask} className='form'>
        <div className=" container">
          <div className="field">
            <div className="control">
              <input
                type="text"
                name="title"
                value={titleInput}
                onChange={handleInputChange}
                placeholder="Add your List Title"
                className="input mb-4"
                data-testid="titleInput"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                name="description"
                value={descriptionInput}
                onChange={handleInputChange}
                placeholder="Your task description here..."
                className="textarea mb-4"
              />
            </div>
          </div>

          <button
            type="submit"
            className="button addTaskBtn is-light mb-6"
          >
            Add a task
          </button>
        </div>
        <div className='taskContainer'>
        </div>
      </form>
    </div>
  );
};

export default taskInput;
