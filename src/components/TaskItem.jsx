import { useTasks } from "../context/TaskContext.jsx";

// Today as YYYY-MM-DD in local time (for overdue checks).
function todayString() {
  return new Date().toLocaleDateString("en-CA");
}

function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TaskItem({ task }) {
  const { toggleTask, deleteTask } = useTasks();
  const { id, title, dueDate, priority, completed } = task;
  const overdue = Boolean(dueDate) && !completed && dueDate < todayString();
  const inputId = `task-${id}`;

  return (
    <li className={`task-item ${completed ? "is-completed" : ""}`}>
      <input
        id={inputId}
        type="checkbox"
        className="task-item__check"
        checked={completed}
        onChange={() => toggleTask(id)}
      />

      <div className="task-item__body">
        <label htmlFor={inputId} className="task-item__title">
          {title}
        </label>
        <div className="task-item__meta">
          <span className={`tag tag--${priority}`}>{priority}</span>
          {dueDate && (
            <span className={overdue ? "task-item__due is-overdue" : "task-item__due"}>
              {overdue ? "Overdue: " : "Due: "}
              {formatDate(dueDate)}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        className="task-item__delete"
        aria-label={`Delete task: ${title}`}
        onClick={() => deleteTask(id)}
      >
        Delete
      </button>
    </li>
  );
}