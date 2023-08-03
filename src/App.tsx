import { useState } from 'react';

import { Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Header from './components/Header';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <div className="card">
        <Button variant='contained' onClick={() => setCount((count) => count + 1)}>
          count up
        </Button>
        <p>{count}</p>
        <Button variant='contained' onClick={() => setCount((count)=> count - 1)}>
          count down
        </Button>
      </div>
      <DatePicker label="Basic date picker" />
    </>
  );
}

export default App;
