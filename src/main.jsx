import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/variables.css";
import "./styles/global.css";
import App from "./App.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import { NotesProvider } from "./context/NotesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TaskProvider>
      <NotesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NotesProvider>
    </TaskProvider>
  </React.StrictMode>
);