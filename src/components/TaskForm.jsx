import { useState } from "react";
import { useTasks } from "../context/TaskContext.jsx";
import { CATEGORIES } from "../context/taskReducer.js";

const MAX_TITLE = 100;

export default function TaskForm({ initialDueDate = "" }) {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(initialDueDate);
  const [category, setCategory] = useState("assignment");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      setError("Please enter a task title.");
      return;
    }
    if (trimmed.length > MAX_TITLE) {
      setError(`Title must be ${MAX_TITLE} characters or fewer.`);
      return;
    }

    addTask({ title: trimmed, dueDate, category, priority });
    setTitle("");
    setDueDate(initialDueDate);
    setCategory("assignment");
    setPriority("medium");
    setError("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="task-form__field task-form__field--title">
        <label htmlFor="task-title">Task</label>
        <input
          id="task-title"
          type="text"
          value={title}
          maxLength={MAX_TITLE + 20}
          placeholder="e.g. Finish CSC 301 assignment"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "task-error" : undefined}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
        />
      </div>

      <div className="task-form__field">
        <label htmlFor="task-due">Due date</label>
        <input
          id="task-due"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="task-form__field">
        <label htmlFor="task-category">Category</label>
        <select
          id="task-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="task-form__field">
        <label htmlFor="task-priority">Priority</label>
        <select
          id="task-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button type="submit" className="btn btn--orange task-form__submit">
        Add task
      </button>

      <p id="task-error" className="task-form__error" role="alert">
        {error}
      </p>
    </form>
  );
}