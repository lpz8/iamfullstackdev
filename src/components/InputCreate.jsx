import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";

export default function InputCreate({ onCreated }) {
  const [title, setTitle] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmed = title.trim();
    if (!trimmed) {
      setError("Escribe un título");
      return;
    }

    try {
      setSending(true);
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: trimmed })
      });
      if (!res.ok) throw new Error("Error creando");

      setTitle("");
      onCreated && onCreated();
      navigate("/");
    } catch (err) {
      setError("No se pudo crear la tarea");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="card">
      <h2>Crear tarea</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="Título de la tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn" disabled={sending}>
          {sending ? "Enviando..." : "Añadir"}
        </button>
      </form>
      {error && <p style={{ color: "#ffd400", textShadow: "0 1px 3px #000" }}>{error}</p>}
    </div>
  );
}