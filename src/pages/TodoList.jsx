import { useState } from "react";
import { Link } from "react-router-dom";
import TodoFormModal from "../components/TodoFormModal";

export default function TodoList({ todos, addTodo, deleteTodo }) {
  const [showAdd, setShowAdd] = useState(false);

  const handleDelete = (todo) => {
    if (window.confirm(`Hapus tugas "${todo.title}"?`)) deleteTodo(todo.id);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Todo List</h1>
        <button className="btn blue" onClick={() => setShowAdd(true)}>Tambah Todo</button>
      </div>

      <table>
        <thead>
          <tr><th>Judul</th><th>Status</th><th>Prioritas</th><th>Deadline</th><th>Aksi</th></tr>
        </thead>
        <tbody>
          {todos.length === 0 && (
            <tr><td colSpan="5" className="empty">Belum ada tugas</td></tr>
          )}
          {todos.map((t) => (
            <tr key={t.id}>
              <td>{t.title.length > 25 ? t.title.slice(0, 25) + "..." : t.title}</td>
              <td>{t.status}</td>
              <td>{t.priority}</td>
              <td>{t.deadline}</td>
              <td>
                <Link to={`/todo/${t.id}`} className="btn blue icon" title="Detail">👁</Link>{" "}
                <button className="btn red icon" title="Hapus" onClick={() => handleDelete(t)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAdd && (
        <TodoFormModal heading="Tambah Todo" submitLabel="Tambah" onSubmit={addTodo} onClose={() => setShowAdd(false)} />
      )}
    </div>
  );
}