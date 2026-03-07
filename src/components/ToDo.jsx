import AddTaskForm from "./AddTaskForm";
import Button from "./Button";
import SearchTaskForm from "./SearchTaskForm";
import ToDoInfo from "./ToDoInfo";
import ToDoList from "./ToDoList";
import { useContext } from "react";
import { TasksContext, TasksProvider } from "../context/TasksContext";

const ToDo = () => {
  const { firstIncompleteTaskRef } = useContext(TasksContext);
  console.log(firstIncompleteTaskRef);

  return (
    <TasksProvider>
      <div className="todo">
        <h1 className="todo__title">To Do List</h1>
        <AddTaskForm />
        <SearchTaskForm />
        <ToDoInfo />
        <Button
          onClick={() =>
            firstIncompleteTaskRef.current?.scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          Show first incomplete task
        </Button>
        <ToDoList />
      </div>
    </TasksProvider>
  );
};

export default ToDo;
