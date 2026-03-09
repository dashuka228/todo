import { TasksProvider } from "../context/TasksContext";
import ToDo from "../components/ToDo";

const TasksPage = () => {
  return (
    <TasksProvider>
      <ToDo />
    </TasksProvider>
  );
};

export default TasksPage;
