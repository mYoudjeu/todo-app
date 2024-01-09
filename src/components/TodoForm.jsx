import React, { useState } from "react";
import { Modal } from "react-responsive-modal";

function TodoForm({ addTodo }) {
  // State to manage the input value
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    // Prevent default behavior (reload the entire page)
    e.preventDefault();

    if (value.trim() !== "") {
      // Call the addTodo function with the current input value
      addTodo(value);

      // Clear the input value after adding todo
      setValue("");
    } else {
      // If the input is empty, open the modal
      setOpen(true);
    }
  };

  // Close the modal
  const onCloseModal = () => {
    setOpen(false);
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

      {/* Modal for displaying an error when the input is empty */}
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          modal: "modal",
        }}
      >
        <h3 className="h3">Please enter a task before adding.</h3>
      </Modal>
    </form>
  );
}

export default TodoForm;
