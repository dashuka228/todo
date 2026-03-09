import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import tasksAPI from "../api/tasksAPI";
// import useTasksLocalStorage from "./useTasksLocalStorage";

const useTasks = () => {
  // const { savedTasks, saveTasks } = useTasksLocalStorage();

  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const newTaskInputRef = useRef(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm(
      "Are u sure u want to delete all these funcking tasks?",
    );

    if (isConfirmed) {
      tasksAPI.deleteAll(tasks).then(() => {
        setTasks([]);
      });
    }
  }, [tasks]);

  const deleteTask = useCallback(
    (taskId) => {
      tasksAPI.delete(taskId).then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId));
      });
    },
    [tasks],
  );

  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      tasksAPI.toggleComplete(taskId, isDone).then(() => {
        setTasks(
          tasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, isDone };
            }
            return task;
          }),
        );
      });
    },
    [tasks],
  );

  const addTask = useCallback((title) => {
    const newTask = {
      title,
      isDone: false,
    };

    tasksAPI.add(newTask).then((addedTask) => {
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      setNewTaskTitle("");
      setSearchQuery("");
      newTaskInputRef.current.focus();
    });
  }, []);

  useEffect(() => {
    newTaskInputRef.current?.focus();
    tasksAPI.getAll().then(setTasks);
  }, []);

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLocaleLowerCase();

    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
          title.toLowerCase().includes(clearSearchQuery),
        )
      : null;
  }, [searchQuery, tasks]);

  return {
    tasks,
    filteredTasks,

    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
  };
};

export default useTasks;
