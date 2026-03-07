import { memo, useContext } from "react";
import ToDoItem from "./ToDoItem";
import { TasksContext } from "../context/TasksContext";

const ToDoList = () => {
  // const {
  //   tasks = [],
  //   onDeleteTaskButtonClick,
  //   onTaskCompleteChange,
  //   filteredTasks,
  //   firstIncompleteTaskId,
  //   firstIncompleteTaskRef,
  // } = props;

  const { tasks, filteredTasks } = useContext(TasksContext);

  const hasTasks = tasks.length > 0;
  const isEmptyFilteredTasks = filteredTasks?.length === 0;

  if (!hasTasks) {
    return <div className="todo__empty-message"> NO TASKS GO WORK</div>;
  } else if (isEmptyFilteredTasks) {
    return (
      <div className="todo__empty-message">WE HAVE NOTHING FOR YOU BITCH</div>
    );
  }

  return (
    <ul className="todo__list">
      {(filteredTasks ?? tasks).map((task) => (
        <ToDoItem
          // title={task.title}
          // isDone={task.isDone}
          className="todo__item"
          // id={task.id}
          key={task.id}
          {...task}
          // ref={
          //   task.id === firstIncompleteTaskId ? firstIncompleteTaskRef : null
          // }
          // onDeleteTaskButtonClick={deleteTask}
          // onTaskCompleteChange={toggleTaskComplete}
        />
      ))}
    </ul>
  );
};

export default memo(ToDoList);
