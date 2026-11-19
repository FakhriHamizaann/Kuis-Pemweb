import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import TodoFormModal from "../components/TodoFormModal";

export default function TodoDetail({ todos, updateTodo }) {
  const { id } = useParams();
  const [showEdit, setShowEdit] = useState(false);
  const todo = todos.find((t) => t.id === Number(id));

  if (!todo) {
    return (
      <div className="container">
        <p>Tugas tidak ditemukan.</p>
        <Link to="/" className="btn red">Kembali</Link>
      </div>
    );
  }

  return (
    <div className="detail-wrap">
      <div className="card detail">
        <div>
          <h4>Judul</h4><p>{todo.title}</p>
          <h4>Deskripsi</h4><div className="desc">{todo.description}</div>
        </div>
        <div>
          <h4>Status</h4><p>{todo.status}</p>
          <h4>Prioritas</h4><p>{todo.priority}</p>
          <h4>Deadline</h4><p>{todo.deadline}</p>
          <div className="row actions">
            <Link to="/" className="btn red">Kembali</Link>
            <button className="btn blue" onClick={() => setShowEdit(true)}>Update</button>
          </div>
        </div>
      </div>

      {showEdit && (
        <TodoFormModal
          heading="Update Todo"
          submitLabel="Update"
          initial={todo}
          onSubmit={(data) => updateTodo(todo.id, data)}
          onClose={() => setShowEdit(false)}
        />
      )}
    </div>
  );
}