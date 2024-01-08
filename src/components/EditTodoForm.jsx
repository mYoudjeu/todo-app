import React, { useState } from "react";

//to open the edit input when the edit icon is clicked
function EditTodoForm({ editTodo, task }) {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(value, task.id);

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
