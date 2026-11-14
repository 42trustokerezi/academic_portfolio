import { useMemo, useState } from "react";
import { useTasks } from "../context/TaskContext.jsx";
import { CATEGORIES, normalizeCategory } from "../context/taskReducer.js";
import {
  buildMonthGrid,
  formatLongDate,
  monthLabel,
  parseDateString,
  shiftMonth,
  todayString,
  weekdayLabels,
} from "../utils/dates.js";
import TaskForm from "./TaskForm.jsx";
import TaskList from "./TaskList.jsx";
import "../styles/calendar.css";

const MAX_DOTS = 2; 

function currentMonth() {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() };
}

export default function CalendarView() {
  const { tasks } = useTasks();
  const today = todayString();
  const [selected, setSelected] = useState(today);
  const [view, setView] = useState(currentMonth);

  
  const tasksByDate = useMemo(() => {
    const map = {};
    tasks.forEach((task) => {
      if (!task.dueDate) return;
      if (!map[task.dueDate]) map[task.dueDate] = [];
      map[task.dueDate].push(task);
    });
    return map;
  }, [tasks]);

  const cells = useMemo(() => buildMonthGrid(view.year, view.month), [view]);
  const weekdays = useMemo(() => weekdayLabels(), []);

  const selectedTasks = tasksByDate[selected] || [];
  const monthTaskCount = cells
    .filter((c) => c.inMonth)
    .reduce((sum, c) => sum + (tasksByDate[c.date] || []).length, 0);

  function selectCell(cell) {
    setSelected(cell.date);
    
    if (!cell.inMonth) {
      const d = parseDateString(cell.date);
      setView({ year: d.getFullYear(), month: d.getMonth() });
    }
  }

  function goToToday() {
    setView(currentMonth());
    setSelected(today);
  }

  return (
    <div className="calendar-layout">
      <section className="calendar" aria-label="Academic calendar">
        <div className="calendar__header">
          <div>
            <h2 className="calendar__title" aria-live="polite">
              {monthLabel(view.year, view.month)}
            </h2>
            <p className="calendar__summary">
              {monthTaskCount} {monthTaskCount === 1 ? "task" : "tasks"} this
              month
            </p>
          </div>

          <div className="calendar__nav">
            <button
              type="button"
              className="calendar__btn"
              aria-label="Previous month"
              onClick={() => setView((v) => shiftMonth(v, -1))}
            >
              &lsaquo;
            </button>
            <button
              type="button"
              className="calendar__today"
              onClick={goToToday}
            >
              Today
            </button>
            <button
              type="button"
              className="calendar__btn"
              aria-label="Next month"
              onClick={() => setView((v) => shiftMonth(v, 1))}
            >
              &rsaquo;
            </button>
          </div>
        </div>

        <div className="calendar__weekdays" aria-hidden="true">
          {weekdays.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className="calendar__grid">
          {cells.map((cell) => {
            const dayTasks = tasksByDate[cell.date] || [];
            const classes = [
              "calendar__day",
              !cell.inMonth && "is-outside",
              cell.date === today && "is-today",
              cell.date === selected && "is-selected",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={cell.date}
                type="button"
                className={classes}
                aria-pressed={cell.date === selected}
                aria-current={cell.date === today ? "date" : undefined}
                aria-label={`${formatLongDate(cell.date)}, ${dayTasks.length} ${
                  dayTasks.length === 1 ? "task" : "tasks"
                }`}
                onClick={() => selectCell(cell)}
              >
                <span className="calendar__number">
                  {Number(cell.date.slice(8))}
                </span>
                <span className="calendar__dots" aria-hidden="true">
                  {dayTasks.slice(0, MAX_DOTS).map((task) => (
                    <i
                      key={task.id}
                      className={`dot cat-${normalizeCategory(task.category)}`}
                    />
                  ))}
                  {dayTasks.length > MAX_DOTS && (
                    <b>+{dayTasks.length - MAX_DOTS}</b>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <ul className="calendar__legend" aria-label="Category colors">
          {CATEGORIES.map((c) => (
            <li key={c.value}>
              <i className={`dot cat-${c.value}`} /> {c.label}
            </li>
          ))}
        </ul>
      </section>

      <section className="day-panel" aria-labelledby="day-title">
        <h2 id="day-title" className="day-panel__title">
          {formatLongDate(selected)}
        </h2>
        <p className="day-panel__count">
          {selectedTasks.length === 0
            ? "Nothing scheduled"
            : `${selectedTasks.length} ${selectedTasks.length === 1 ? "task" : "tasks"} due`}
        </p>

        <TaskForm key={selected} initialDueDate={selected} />

        <TaskList
          tasks={selectedTasks}
          emptyMessage="Nothing due on this day."
        />
      </section>
    </div>
  );
}
