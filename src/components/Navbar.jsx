import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTasks } from "../context/TaskContext.jsx";
import { useSectionLinkClick } from "../hooks/useSectionRouting.js";
import profile from "../data/profile.js";
import "../styles/navbar.css";

const links = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/planner", label: "Planner" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pendingCount } = useTasks();
  const handleSectionClick = useSectionLinkClick();
  const close = () => setOpen(false);
  const initial = profile.name.trim().charAt(0).toUpperCase();

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <div className="navbar__left">
          <button
            className="navbar__toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((o) => !o)}
          >
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
                    onClick={(e) => {
                      close();
                      handleSectionClick(e, to);
                    }}
                    className={({ isActive }) => (isActive ? "active" : undefined)}
                  >
                    {label}
                    {to === "/planner" && pendingCount > 0 && (
                      <span className="badge" aria-label={`${pendingCount} pending tasks`}>
                        {pendingCount}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <NavLink
          to="/"
          end
          className="navbar__logo"
          aria-label={`${profile.name} - Home`}
          onClick={(e) => {
            close();
            handleSectionClick(e, "/");
          }}
        >
          {initial}
        </NavLink>

        <div className="navbar__right">
          <a className="navbar__contact" href={`mailto:${profile.email}`}>
            Contact Me
          </a>
        </div>
      </div>
    </header>
  );
}