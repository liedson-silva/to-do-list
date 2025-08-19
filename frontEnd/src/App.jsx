import "./App.css";
import { useEffect, useState, useRef } from "react";
import api from "./services/axios.js";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const inputTask = useRef();

  async function getTasks() {
    const tasksFromApi = await api.get("/task");
    setTasks(tasksFromApi.data);
  }

  async function handleAddOrEdit() {
    const text = inputTask.current.value.trim();
    if (!text) return;

    if (editId) {
      await api.put(`/task/${editId}`, { task: text });
      setEditId(null);
    } else {
      await api.post("/task", { task: text });
    }

    inputTask.current.value = "";
    getTasks();
  }

  function startEdit(task) {
    inputTask.current.value = task.task;
    setEditId(task.id);
    inputTask.current.focus();
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

        <div>
          <input ref={inputTask} type="text" placeholder="Nova tarefa..." />
          <button className="buttonAdd" onClick={handleAddOrEdit}>
            {editId ? "Save" : "Add"}
          </button>
        </div>

        <div className="boxTasks">
          {tasks.map((task) => (
            <div className="task" key={task.id}>
              <div className="boxTask">
                {task.task}
                <button className="edit-task" onClick={() => startEdit(task)}>
                  <FaRegEdit />
                </button>
              </div>
              <button className="buttonDelete" onClick={() => deleteTasks(task.id)}>
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
