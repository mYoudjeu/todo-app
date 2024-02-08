import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPenToSquare, faStar } from "@fortawesome/free-regular-svg-icons";
import { faTrash, faStar as starSolid, faCircle as circleSolid } from "@fortawesome/free-solid-svg-icons";
import { useTodoContext } from "TodoContext";

interface TodoProps {
  task: {
    id: string;
    task: string;
    completed: boolean;
    isImportant: boolean;
  };
  deleteTodo: (id: string) => void;
}

// Todo component for displaying a single todo item
const Todo: React.FC<TodoProps> = ({ task, deleteTodo }) => {
  const { toggleComplete, editTodo, reorder, currentTodo, sTodo } = useTodoContext();
  const [isImportant, setIsImportant] = useState(task.isImportant);

  useEffect(() => {
    setIsImportant(task.isImportant);
  }, [task.isImportant]);

  const handleStarClick = () => {
    reorder(task.id);
  };


  return (
    <div className="Todo">
      {/* Click event to call complete class */}
      <div className="circle-icon">
        <FontAwesomeIcon
          icon={task.completed ? circleSolid : faCircle}
          color="#3e69e4"
          onClick={() => toggleComplete(task.id)}
        />
      </div>
      <div className="todo-display" onClick={() => currentTodo(task.task, task.id, task.completed)}>
        <p
          {...() => toggleComplete(task.id)}
          className={`${task.completed ? "completed" : ""}`}
        >
          {task.task}
        </p>
      </div>
      <FontAwesomeIcon
        data-testid="editButton"
        icon={faPenToSquare}
        color="#3e69e4"
        onClick={() => editTodo(task.id)}
      />
      <FontAwesomeIcon
        icon={isImportant ? starSolid : faStar}
        onClick={handleStarClick}
        type="submit"
        color="#3e69e4"
      />
      <FontAwesomeIcon
        data-testid="deleteButton"
        icon={faTrash}
        color="#a80000"
        onClick={() => deleteTodo(task.id)}
      />
    </div>
  );
};

export default Todo;
