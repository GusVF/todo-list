import Header from './components/Header';
import TaskInput from './components/taskInput';

function App() {

  return (
    <div>
      <Header />
      <TaskInput />
      {/* Loading for mock fetch or a real fetch */}
      {/* {fetching ? <p>Loading...</p> : null} */}
      
      {/* Date picker in Material UI */}
      {/* <DatePicker label="Pick a date..." /> */}
    </div>
  );
}

export default App;
