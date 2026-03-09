const URL = "http://localhost:3001/tasks";

const headers = {
  "Content-Type": "application/json",
};

const tasksAPI = {
  getAll: () => {
    return fetch(URL).then((res) => res.json());
  },

  add: (task) => {
    return fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(task),
    }).then((res) => res.json());
  },

  delete: (taskId) => {
    return fetch(`${URL}/${taskId}`, {
      method: "DELETE",
    });
  },

  deleteAll: (tasks) => {
    return Promise.all(
      tasks.map((task) => {
        return fetch(`http://localhost:3001/tasks/${task.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
      }),
    );
  },

  toggleComplete: (taskId, isDone) => {
    return fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ isDone }),
    });
  },
};

export default tasksAPI;
