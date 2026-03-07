import AddTaskForm from "./AddTaskForm";
import Button from "./Button";
import SearchTaskForm from "./SearchTaskForm";
import ToDoInfo from "./ToDoInfo";
import ToDoList from "./ToDoList";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const ToDo = () => {
  console.log("todo");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [
      {
        id: "task-1",
        title: "Buy some milfs",
        isDone: false,
      },
      {
        id: "task-2",
        title: "Play chess",
        isDone: true,
      },
    ];
  });
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const newTaskInputRef = useRef(null);
  const firstIncompleteTaskRef = useRef(null);
  const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id;

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm(
      "Are u sure u want to delete all these funcking tasks?",
    );

    if (isConfirmed) {
      setTasks([]);
    }
  }, []);

  const deleteTask = useCallback(
    (taskId) => {
      setTasks(tasks.filter((task) => task.id !== taskId));
    },
    [tasks],
  );

  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      setTasks(
        tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, isDone };
          }

          return task;
        }),
      );
    },
    [tasks],
  );

  const addTask = useCallback(() => {
    // const newTaskTitle = newTaskInputRef.current.value;
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskTitle("");
      setSearchQuery("");
      // newTaskInputRef.current.value = "";
      newTaskInputRef.current.focus();
    }
  }, [newTaskTitle]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    newTaskInputRef.current.focus();
  }, []);

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLocaleLowerCase();

    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
          title.toLowerCase().includes(clearSearchQuery),
        )
      : null;
  }, [searchQuery, tasks]);

  const doneTasks = useMemo(() => {
    return tasks.filter(({ isDone }) => isDone).length;
  }, [tasks]);

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        addTask={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        newTaskInputRef={newTaskInputRef}
      />
      <SearchTaskForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ToDoInfo
        total={tasks.length}
        done={doneTasks}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <Button
        onClick={() =>
          firstIncompleteTaskRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      >
        Show first incomplete task
      </Button>
      <ToDoList
        tasks={tasks}
        filteredTasks={filteredTasks}
        firstIncompleteTaskId={firstIncompleteTaskId}
        firstIncompleteTaskRef={firstIncompleteTaskRef}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTaskComplete}
      />
    </div>
  );
};

export default ToDo;
