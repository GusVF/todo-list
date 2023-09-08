import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Header from './components/Header';
import './App.css';
import { StatusEnum } from './enums/todo.enum';
import { addNewTodo } from './redux/actions/todo.action';
import { Dispatch } from './types/dispatch';
import { ReduceType } from './types/todo.type';

function App() {
  const dispatch: Dispatch = useDispatch();

  const { todoReducer: { fetching } } = useSelector((state: ReduceType) => state);

  useEffect(() => {
    dispatch(addNewTodo({
      title: 'make it happen',
      description: 'new happens',
      status: StatusEnum.COMPLETED,
      date: new Date().toISOString(),
    }));
  }, []);

  return (
    <>
      <Header />
      {fetching ? <p>Loading...</p> : null}
      <div className="card">
        <Button sx={{ color: 'black' }} variant='contained' color='info'>
          count up
        </Button>
      </div>
      <DatePicker label="Pick a date..." />
    </>
  );
}

export default App;
