import { useState } from "react";
import { useNotes } from "../context/NotesContext.jsx";
import { MAX_NOTE_BODY, MAX_NOTE_TITLE } from "../context/noteReducer.js";
import { formatTimestamp } from "../utils/dates.js";

export default function NoteCard({ note }) {
  const { updateNote, deleteNote } = useNotes();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [error, setError] = useState("");

  function startEditing() {
    setTitle(note.title);
    setBody(note.body);
    setError("");
    setEditing(true);
  }

  function handleSave(e) {
    e.preventDefault();
    if (!body.trim()) {
      setError("A note can't be empty.");
      return;
    }
    updateNote(note.id, { title, body });
    setEditing(false);
  }

  function handleDelete() {
    if (window.confirm("Delete this note?")) deleteNote(note.id);
  }

  if (editing) {
    return (
      <li className="note-card note-card--editing">
        <form onSubmit={handleSave} noValidate>
          <label htmlFor={`note-title-${note.id}`} className="visually-hidden">
            Note title
          </label>
          <input
            id={`note-title-${note.id}`}
            type="text"
            value={title}
            maxLength={MAX_NOTE_TITLE}
            placeholder="Title (optional)"
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor={`note-body-${note.id}`} className="visually-hidden">
            Note text
          </label>
          <textarea
            id={`note-body-${note.id}`}
            value={body}
            maxLength={MAX_NOTE_BODY}
            rows={6}
            aria-invalid={Boolean(error)}
            onChange={(e) => {
              setBody(e.target.value);
              if (error) setError("");
            }}
          />

          <p className="note-form__error" role="alert">
            {error}
          </p>

          <div className="note-card__actions">
            <button type="submit" className="mini-btn mini-btn--solid">
              Save
            </button>
            <button type="button" className="mini-btn" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      </li>
    );
  }

  const edited = note.updatedAt !== note.createdAt;

  return (
    <li className="note-card">
      {note.title && <h3 className="note-card__title">{note.title}</h3>}
      <p className="note-card__body">{note.body}</p>

      <div className="note-card__footer">
        <span>
          {edited ? "Edited " : ""}
          {formatTimestamp(note.updatedAt)}
        </span>
        <div className="note-card__actions">
          <button
            type="button"
            className="mini-btn"
            aria-label={`Edit note${note.title ? `: ${note.title}` : ""}`}
            onClick={startEditing}
          >
            Edit
          </button>
          <button
            type="button"
            className="mini-btn mini-btn--danger"
            aria-label={`Delete note${note.title ? `: ${note.title}` : ""}`}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}