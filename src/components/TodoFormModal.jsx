import { useState } from "react";

const empty = { title: "", description: "", status: "to-do", priority: "low", deadline: "" };

export default function TodoFormModal({ heading, submitLabel, initial = empty, onSubmit, onClose }) {
  const [form, setForm] = useState(initial);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.deadline) {
      alert("Judul dan deadline wajib diisi");
      return;
    }
    onSubmit(form);
    onClose();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h3>{heading}</h3>

        <label>Judul</label>
        <input name="title" value={form.title} onChange={handleChange} />

        <label>Deskripsi</label>
        <textarea name="description" rows="3" value={form.description} onChange={handleChange} />

        <div className="row">
          <div>
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option>to-do</option>
              <option>in progress</option>
              <option>done</option>
            </select>
          </div>
          <div>
            <label>Prioritas</label>
            <select name="priority" value={form.priority} onChange={handleChange}>
              <option>low</option>
              <option>medium</option>
              <option>high</option>
            </select>
          </div>
        </div>

        <label>Deadline</label>
        <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />

        <div className="row actions">
          <button type="button" className="btn red" onClick={onClose}>Batal</button>
          <button type="submit" className="btn blue">{submitLabel}</button>
        </div>
      </form>
    </div>
  );
}