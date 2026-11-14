import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { readStorage, writeStorage } from "../hooks/useLocalStorage.js";
import {
  ADD_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE,
  createNote,
  isValidNote,
  noteReducer,
} from "./noteReducer.js";

const STORAGE_KEY = "academic-planner-notes";

const NotesContext = createContext(null);

function loadNotes() {
  const saved = readStorage(STORAGE_KEY, []);
  return Array.isArray(saved) ? saved.filter(isValidNote) : [];
}

export function NotesProvider({ children }) {
  const [notes, dispatch] = useReducer(noteReducer, undefined, loadNotes);


  useEffect(() => {
    writeStorage(STORAGE_KEY, notes);
  }, [notes]);

  const addNote = useCallback((fields) => {
    const note = createNote(fields);
    if (note) dispatch({ type: ADD_NOTE, payload: note });
    return note;
  }, []);

  const updateNote = useCallback(
    (id, fields) => dispatch({ type: UPDATE_NOTE, payload: { id, ...fields } }),
    []
  );
  const deleteNote = useCallback(
    (id) => dispatch({ type: DELETE_NOTE, payload: id }),
    []
  );

  const value = useMemo(
    () => ({ notes, addNote, updateNote, deleteNote }),
    [notes, addNote, updateNote, deleteNote]
  );

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) {
    throw new Error("useNotes must be used inside a <NotesProvider>.");
  }
  return ctx;
}