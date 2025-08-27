import { useEffect, useState } from "react";
import { API_URL } from "./api";

export default function Home({ data, onDeleted }) {
  const [tasks, setTasks] = useState(data || []);

  useEffect(() => { setTasks(data || []); }, [data]);

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((t) => t.id !== id));
      onDeleted && onDeleted();
    } catch {
      alert("No se pudo borrar la tarea");
    }
  };

  return (
    <div className="card">
      <h1>Mis tareas</h1>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <span>{t.title}</span>
            <button className="btn btn-danger" onClick={() => handleDelete(t.id)}>
              Borrar Tarea
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
