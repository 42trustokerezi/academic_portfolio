export const ADD_NOTE = "ADD_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";

export const MAX_NOTE_TITLE = 80;
export const MAX_NOTE_BODY = 5000;

function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createNote({ title = "", body = "" }) {
  const cleanBody = String(body ?? "").trim().slice(0, MAX_NOTE_BODY);
  if (!cleanBody) return null;

  const now = Date.now();
  return {
    id: generateId(),
    title: String(title ?? "").trim().slice(0, MAX_NOTE_TITLE),
    body: cleanBody,
    createdAt: now,
    updatedAt: now,
  };
}

export function isValidNote(n) {
  return (
    n !== null &&
    typeof n === "object" &&
    typeof n.id === "string" &&
    typeof n.title === "string" &&
    typeof n.body === "string"
  );
}

export function noteReducer(state, action) {
  switch (action.type) {
    case ADD_NOTE:
      return [action.payload, ...state];
    case UPDATE_NOTE: {
      const { id, title, body } = action.payload;
      return state.map((n) =>
        n.id === id
          ? {
              ...n,
              title: String(title ?? "").trim().slice(0, MAX_NOTE_TITLE),
              body: String(body ?? "").trim().slice(0, MAX_NOTE_BODY),
              updatedAt: Date.now(),
            }
          : n
      );
    }
    case DELETE_NOTE:
      return state.filter((n) => n.id !== action.payload);
    default:
      return state;
  }
}