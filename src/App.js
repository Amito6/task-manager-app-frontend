import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskList from "./components/TaskList";

export const URL = process.env.REACT_APP_SERVER_URL

const App = () =>{
  const design = (
    <div className="app">
      <div className="task-container">
        <TaskList />
        <ToastContainer />
      </div>
    </div>
  );
  return design;
};

export default App;