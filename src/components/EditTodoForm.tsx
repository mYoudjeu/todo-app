import React, { useState } from "react";
import { useTodoContext } from "TodoContext";

interface EditTodoFormProps {
  task: {
    id: string;
    task: string;
    completed: boolean;
    isEditing: boolean;
  };
}

// To open the edit input when the edit icon is clicked
const EditTodoForm: React.FC<EditTodoFormProps> = ({ task }) => {
  const { editTask } = useTodoContext();
  const [value, setValue] = useState<string>(task.task);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editTask(value, task.id);
    setValue("");


  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        className="todo-input"
        placeholder="Edit task"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn ">
        Edit
      </button>
    </form>
  );
}

export default EditTodoForm;
