import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import useTasksLocalStorage from "./useTasksLocalStorage";

const useTasks = () => {
  const { savedTasks, saveTasks } = useTasksLocalStorage();

  const [tasks, setTasks] = useState(
    savedTasks ?? [
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
    ],
  );
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const newTaskInputRef = useRef(null);

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
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskTitle("");
      setSearchQuery("");
      newTaskInputRef.current.focus();
    }
  }, [newTaskTitle]);

  useEffect(() => {
    // localStorage.setItem("tasks", JSON.stringify(tasks));
    saveTasks(tasks);
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
