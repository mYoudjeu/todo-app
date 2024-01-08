import React, { useState } from "react";

function TodoForm({ addTodo }) {
  // State to manage the input value
  const [value, setValue] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    //prevent default behavior (reload the entire page)
    e.preventDefault();
    // Call the addTodo function with the current input value
    addTodo(value);
    // Clear the input value after adding todo
    setValue("");
  };
  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        className="todo-input"
        placeholder="What is your new task?"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn ">
        Add
      </button>
    </form>
  );
}

export default TodoForm;
