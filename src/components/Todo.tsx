import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTodoContext } from "TodoContext";

interface TodoProps {

  task: {
    id: string;
    task: string;
    completed: boolean;
  };
  deleteTodo: (id: string) => void;
}

// Todo component for displaying a single todo item
const Todo: React.FC<TodoProps> = ({task, deleteTodo}) => {
  const {toggleComplete, editTodo} = useTodoContext();
  return (
    <div className="Todo">
      {/* Click event to call complete class */}
      <p
        onClick={() => toggleComplete(task.id)}
        className={`${task.completed ? "completed" : ""}`}
      >
        {task.task}
      </p>
      <div className="pointer">
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => editTodo(task.id)}
        />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  );
}

export default Todo;
