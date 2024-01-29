import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faStar } from "@fortawesome/free-regular-svg-icons";
import { faTrash, faStar as starSolid } from "@fortawesome/free-solid-svg-icons";
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
  const { toggleComplete, editTodo, reorder } = useTodoContext();
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
      <p
        onClick={() => toggleComplete(task.id)}
        className={`${task.completed ? "completed" : ""}`}
      >
        {task.task}
      </p>
      <div>
        <FontAwesomeIcon
          data-testid="editButton"
          icon={faPenToSquare}
          onClick={() => editTodo(task.id)}
        />
        <FontAwesomeIcon
          data-testid="deleteButton"
          icon={faTrash}
          onClick={() => deleteTodo(task.id)}
        />
        <FontAwesomeIcon
          icon={isImportant ? starSolid : faStar}
          onClick={handleStarClick}
          type="submit"
        />
      </div>
    </div>
  );
};

export default Todo;
