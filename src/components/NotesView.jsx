import { useMemo, useState } from "react";
import { useNotes } from "../context/NotesContext.jsx";
import { MAX_NOTE_BODY, MAX_NOTE_TITLE } from "../context/noteReducer.js";
import NoteCard from "./NoteCard.jsx";
import "../styles/notes.css";

export default function NotesView() {
  const { notes, addNote } = useNotes();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!body.trim()) {
      setError("Write something in the note first.");
      return;
    }
    addNote({ title, body });
    setTitle("");
    setBody("");
    setError("");
  }

  const visibleNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q),
    );
  }, [notes, query]);

  return (
    <div className="notes">
      <form className="note-form" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="note-title">Title (optional)</label>
          <input
            id="note-title"
            type="text"
            value={title}
            maxLength={MAX_NOTE_TITLE}
            placeholder="e.g. Data Science lecture 4"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="note-body">Note</label>
          <textarea
            id="note-body"
            value={body}
            maxLength={MAX_NOTE_BODY}
            rows={5}
            placeholder="Write down lecture points, ideas, reminders..."
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "note-error" : undefined}
            onChange={(e) => {
              setBody(e.target.value);
              if (error) setError("");
            }}
          />
        </div>

        <div className="note-form__actions">
          <button type="submit" className="btn btn--orange">
            Add note
          </button>
          <p id="note-error" className="note-form__error" role="alert">
            {error}
          </p>
        </div>
      </form>

      <div className="notes__bar">
        <div className="notes__search">
          <label htmlFor="note-search" className="visually-hidden">
            Search notes
          </label>
          <input
            id="note-search"
            type="search"
            value={query}
            placeholder="Search notes..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <p className="notes__count">
          {notes.length} {notes.length === 1 ? "note" : "notes"}
        </p>
      </div>

      {visibleNotes.length === 0 ? (
        <p className="task-empty">
          {notes.length === 0
            ? "No notes yet. Write your first note above."
            : "No notes match your search."}
        </p>
      ) : (
        <ul className="notes__grid">
          {visibleNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </ul>
      )}
    </div>
  );
}
