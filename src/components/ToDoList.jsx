import ToDoItem from "./ToDoItem";

const ToDoList = (props) => {
  const {
    tasks = [],
    onDeleteTaskButtonClick,
    onTaskCompleteChange,
    filteredTasks,
  } = props;

  const hasTasks = tasks.length > 0;
  const isEmptyFilteredTasks = filteredTasks?.length === 0;

  if (!hasTasks) {
    return <div className="todo__empty-message"> NO TASKS GO WORK</div>;
  } else if (isEmptyFilteredTasks) {
    return (
      <div className="todo__empty-message">NOTHING FOR YOUR STUPID SEARCH</div>
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
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
          onTaskCompleteChange={onTaskCompleteChange}
        />
      ))}
    </ul>
  );
};

export default ToDoList;
