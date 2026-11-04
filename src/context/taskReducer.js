export const ADD_TASK = "ADD_TASK";
export const TOGGLE_TASK = "TOGGLE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const CLEAR_COMPLETED = "CLEAR_COMPLETED";

const PRIORITIES = ["low", "medium", "high"];

function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}


export function createTask({ title, dueDate = "", priority = "medium" }) {
  const cleanTitle = String(title ?? "").trim();
  if (!cleanTitle) return null;

  return {
    id: generateId(),
    title: cleanTitle,
    dueDate: dueDate || "",
    priority: PRIORITIES.includes(priority) ? priority : "medium",
    completed: false,
    createdAt: Date.now(),
  };
}


export function isValidTask(t) {
  return (
    t !== null &&
    typeof t === "object" &&
    typeof t.id === "string" &&
    typeof t.title === "string" &&
    typeof t.completed === "boolean"
  );
}

export function taskReducer(state, action) {
  switch (action.type) {
    case ADD_TASK:
      return [action.payload, ...state];
    case TOGGLE_TASK:
      return state.map((t) =>
        t.id === action.payload ? { ...t, completed: !t.completed } : t
      );
    case DELETE_TASK:
      return state.filter((t) => t.id !== action.payload);
    case CLEAR_COMPLETED:
      return state.filter((t) => !t.completed);
    default:
      return state;
  }
}