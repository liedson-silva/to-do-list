import "./App.css";
import { useEffect, useState, useRef } from "react";
import api from "./services/axios.js";

function App() {
  const [tasks, setTasks] = useState([]);
  const inputTask = useRef();

  async function getTasks() {
    const tasksFromApi = await api.get("/task");
    setTasks(tasksFromApi.data);
  }

  async function createTasks() {
    await api.post("/task", {
      task: inputTask.current.value
    });
    getTasks();
    inputTask.current.value = "";
  }

  async function deleteTasks(id) {
    await api.delete(`/task/${id}`);
    getTasks();
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="container">
      <div className="box">
        <h1>To-Do List</h1>

        <div className="task">
          <input ref={inputTask} type="text" placeholder="Nova tarefa..." />
          <button className="buttonAdd" onClick={createTasks}>Add</button>
        </div>

        <div className="boxTasks">
          {tasks.map((task) => (
            <div className="task" key={task.id}>
              <p className="boxTask">{task.task}</p>
              <button className="buttonDelete" onClick={() => deleteTasks(task.id)}>
                Deletar
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;
