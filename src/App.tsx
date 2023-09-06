import { useState } from 'react';

import { Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Header from './components/Header';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const handleCountDown = (): void => {
    if (count > 0) {
      setCount((count) => count - 1);
    }
  };

return (
  <>
    <Header />
    <div className="card">
      <Button 
      sx={{ color: 'black' }}
      variant='contained' color='info' onClick={() => setCount((count) => count + 1)}>
        count up
      </Button>
      <p>{count}</p>
      <Button 
      sx={{ color: 'black' }}
      variant='contained' color='warning' onClick={handleCountDown}>
        count down
        Send
      </Button>
    </div>
    <DatePicker label="Pick a date..." />
  </>
); 
}

export default App;
