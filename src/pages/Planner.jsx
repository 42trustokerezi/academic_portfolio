import { useState } from "react";
import { useTasks } from "../context/TaskContext.jsx";
import { useNotes } from "../context/NotesContext.jsx";
import TasksView from "../components/TasksView.jsx";
import CalendarView from "../components/CalendarView.jsx";
import NotesView from "../components/NotesView.jsx";
import "../styles/planner.css";

export default function Planner() {
  const [view, setView] = useState("tasks");
  const { pendingCount } = useTasks();
  const { notes } = useNotes();

  const tabs = [
    { key: "tasks", label: "Tasks", count: pendingCount },
    { key: "calendar", label: "Calendar", count: 0 },
    { key: "notes", label: "Notes", count: notes.length },
  ];

  return (
    <div className="planner-page">
      <section className="container page planner">
        <h1 className="section-title">
          My <strong>planner</strong>
        </h1>
        <p className="planner__intro">
          Keep track of assignments, exams, and study sessions, see them on the
          calendar, and jot down notes. Everything is saved in this browser.
        </p>

        <div className="planner__tabs" role="group" aria-label="Planner views">
          {tabs.map(({ key, label, count }) => (
            <button
              key={key}
              type="button"
              className={`planner__tab ${view === key ? "is-active" : ""}`}
              aria-pressed={view === key}
              onClick={() => setView(key)}
            >
              {label}
              {count > 0 && <span className="planner__count">{count}</span>}
            </button>
          ))}
        </div>

        {view === "tasks" && <TasksView />}
        {view === "calendar" && <CalendarView />}
        {view === "notes" && <NotesView />}
      </section>
    </div>
  );
}