import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "../styles/planner.css";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
];

const EMPTY_MESSAGES = {
  all: "No tasks yet. Add your first task above to get started.",
  active: "Nothing left to do. Nice work!",
  completed: "No completed tasks yet.",
};

export default function Planner() {
  const { tasks, completedCount, clearCompleted } = useTasks();
  const [filter, setFilter] = useState("all");

  const visibleTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const total = tasks.length;
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <section className="container page planner">
      <h1>Academic Planner</h1>
      <p className="planner__intro">
        Keep track of assignments, study sessions, and deadlines. Your tasks are
        saved in this browser.
      </p>

      <TaskForm />

      <div className="planner__summary" aria-live="polite">
        <p>
          <strong>
            {completedCount} of {total}
          </strong>{" "}
          {total === 1 ? "task" : "tasks"} completed
        </p>
        <div
          className="progress"
          role="progressbar"
          aria-label="Tasks completed"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
        >
          <div className="progress__bar" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="planner__toolbar">
        <div className="filters" role="group" aria-label="Filter tasks">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className={`filters__btn ${filter === key ? "is-active" : ""}`}
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="link-btn"
          onClick={clearCompleted}
          disabled={completedCount === 0}
        >
          Clear completed
        </button>
      </div>

      <TaskList tasks={visibleTasks} emptyMessage={EMPTY_MESSAGES[filter]} />
    </section>
  );
}
