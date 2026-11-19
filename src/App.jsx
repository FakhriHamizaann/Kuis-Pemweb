import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { initialTodos } from "./data/todos";
import TodoList from "./pages/TodoList";
import TodoDetail from "./pages/TodoDetail";

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [notice, setNotice] = useState("");

  const notify = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(""), 2500);
  };

  const addTodo = (data) => {
    setTodos((prev) => [...prev, { ...data, id: Date.now() }]);
    notify("Tugas berhasil ditambahkan");
  };

  const updateTodo = (id, data) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
    notify("Tugas berhasil diperbarui");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    notify("Tugas berhasil dihapus");
  };

  return (
    <>
      {notice && <div className="toast">{notice}</div>}
      <Routes>
        <Route path="/" element={<TodoList todos={todos} addTodo={addTodo} deleteTodo={deleteTodo} />} />
        <Route path="/todo/:id" element={<TodoDetail todos={todos} updateTodo={updateTodo} />} />
      </Routes>
    </>
  );
}