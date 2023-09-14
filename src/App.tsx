import TaskInput from '../src/components/TaskInput';
import Header from './components/Header/Header';
import TaskList from './components/TaskList';
import './styles/Index.css';

function App() {

  return (
    <main>
      <Header />
      <div className="main
      is-flex
      is-justify-content-space-around">
        <TaskInput />
        <TaskList />
      </div>
    </main>
  );
}

export default App;
