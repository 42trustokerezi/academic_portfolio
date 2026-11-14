import { useTasks } from "../context/TaskContext.jsx";
import { categoryLabel, normalizeCategory } from "../context/taskReducer.js";
import { formatShortDate, todayString } from "../utils/dates.js";

export default function TaskItem({ task }) {
  const { toggleTask, deleteTask } = useTasks();
  const { id, title, dueDate, priority, completed } = task;
  const category = normalizeCategory(task.category);
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
          <span className={`cat cat-${category}`}>{categoryLabel(category)}</span>
          <span className={`chip chip--${priority}`}>{priority}</span>
          {dueDate && (
            <span className={overdue ? "task-item__due is-overdue" : "task-item__due"}>
              {overdue ? "Overdue: " : "Due: "}
              {formatShortDate(dueDate)}
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