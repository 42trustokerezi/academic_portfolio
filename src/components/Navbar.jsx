import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTasks } from "../context/TaskContext.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/planner", label: "Planner" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pendingCount } = useTasks();
  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand" onClick={close}>
          Trust<span>Okerezi</span>
        </NavLink>

        <button
          className="navbar__toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="primary-nav"
          className={`navbar__links ${open ? "is-open" : ""}`}
          aria-label="Primary"
        >
          <ul>
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  onClick={close}
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  {label}
                  {to === "/planner" && pendingCount > 0 && (
                    <span
                      className="badge"
                      aria-label={`${pendingCount} pending tasks`}
                    >
                      {pendingCount}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
