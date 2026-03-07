import { memo } from "react";
import ToDoItem from "./ToDoItem";

const ToDoList = (props) => {
  const {
    tasks = [],
    onDeleteTaskButtonClick,
    onTaskCompleteChange,
    filteredTasks,
    firstIncompleteTaskId,
    firstIncompleteTaskRef,
  } = props;

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
          title={task.title}
          isDone={task.isDone}
          className="todo__item"
          id={task.id}
          key={task.id}
          ref={
            task.id === firstIncompleteTaskId ? firstIncompleteTaskRef : null
          }
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
          onTaskCompleteChange={onTaskCompleteChange}
        />
      ))}
    </ul>
  );
};

export default memo(ToDoList);
