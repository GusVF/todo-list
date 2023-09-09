import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Stack, TextField } from '@mui/material';

import { StatusEnum } from '../enums/todo.enum';
import { addNewTodo } from '../redux/actions/todo.action';
import { NewTodoType } from '../types/todo.type';

const taskInput: React.FC = () => {
  const [taskInput, setTaskInput] = useState('');
  const dispatch = useDispatch();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (taskInput.trim() !== '') {
      const newTodo: NewTodoType = {
        title: taskInput,
        description: '',
        status: StatusEnum.PENDING,
        date: new Date().toISOString()
      };
      addNewTodo(newTodo)(dispatch);
      setTaskInput('');
    }
  };

  return (
    <form 
    onSubmit={handleAddTask}
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
      <Button
      variant="contained"
      style={{ marginBottom: '25px',
       maxWidth: '200px',
       marginLeft: '10%',
       paddingTop: '10px',
       paddingBottom: '10px',
       border: '1px solid white',
      }}
      type="submit"
      >
        Click to add...
      </Button>
      <Stack 
      spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap"
      style={{ marginLeft: '10%' }}
      >
        <TextField 
        label="Type your task!"
        variant="standard"
        value={taskInput}
        onChange={handleInput}
          />
      </Stack>
    </form>
  );

};

export default taskInput;