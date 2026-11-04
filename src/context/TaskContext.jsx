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
  ADD_TASK,
  CLEAR_COMPLETED,
  DELETE_TASK,
  TOGGLE_TASK,
  createTask,
  isValidTask,
  taskReducer,
} from "./taskReducer.js";

const STORAGE_KEY = "academic-planner-tasks";

const TaskContext = createContext(null);

function loadTasks() {
  const saved = readStorage(STORAGE_KEY, []);
  return Array.isArray(saved) ? saved.filter(isValidTask) : [];
}

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, undefined, loadTasks);

  useEffect(() => {
    writeStorage(STORAGE_KEY, tasks);
  }, [tasks]);

  const addTask = useCallback((fields) => {
    const task = createTask(fields);
    if (task) dispatch({ type: ADD_TASK, payload: task });
    return task;
  }, []);

  const toggleTask = useCallback(
    (id) => dispatch({ type: TOGGLE_TASK, payload: id }),
    []
  );
  const deleteTask = useCallback(
    (id) => dispatch({ type: DELETE_TASK, payload: id }),
    []
  );
  const clearCompleted = useCallback(
    () => dispatch({ type: CLEAR_COMPLETED }),
    []
  );

  const completedCount = useMemo(
    () => tasks.filter((t) => t.completed).length,
    [tasks]
  );
  const pendingCount = tasks.length - completedCount;

  const value = useMemo(
    () => ({
      tasks,
      addTask,
      toggleTask,
      deleteTask,
      clearCompleted,
      completedCount,
      pendingCount,
    }),
    [tasks, addTask, toggleTask, deleteTask, clearCompleted, completedCount, pendingCount]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error("useTasks must be used inside a <TaskProvider>.");
  }
  return ctx;
}