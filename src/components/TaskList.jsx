import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, emptyMessage }) {
  if (tasks.length === 0) {
    return <p className="task-empty">{emptyMessage}</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}