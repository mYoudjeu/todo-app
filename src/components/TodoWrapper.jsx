import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

// Generate a unique identifier using uuid which has 128 bit
uuidv4();

// Fetch tasks from local storage and converting into a javaScript object or use an empty array if none exist
const DB_TASKS = JSON.parse(localStorage.getItem("maviance-todos") || "[]");

function TodoWrapper() {
  const [todos, setTodos] = useState(DB_TASKS);
  const [todo, setTodo] = useState(null);
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);

  // Open modal with selected todo to delete todo
  const onOpenModal = (selectTodo) => {
    setTodo(selectTodo);
    setOpen(true);
  };
  //close modal and reset todo state
  const onCloseModal = () => {
    setTodo(null);
    setOpen(false);
  };

  //add new todo
  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  //switch complete status
  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo and close the modal
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    onCloseModal();
  };

  //change editing status
  const editTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  //edit or update a task
  const editTask = (task, id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };
  // Filter todos based on the selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return todo.completed;
    } else if (filter === "uncompleted") {
      return !todo.completed;
    }
    return true;
  });

  // Save todos to local storage everytime the todos state is altered
  useEffect(() => {
    localStorage.setItem("maviance-todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="TodoWrapper">
      <h1>Get Tasks Done!</h1>
      <div className="form-and-filter">
        {/** passing the addTodo as property to the todoForm*/}
        <TodoForm addTodo={addTodo} />
        {/* Dropdown for selecting the filter */}
        <select
          className="filter-dropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>

      {/* Display todos based on the selected filter */}
      {filteredTodos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} key={index} />
        ) : (
          <Todo
            task={todo}
            key={index}
            toggleComplete={toggleComplete}
            deleteTodo={() => onOpenModal(todo)}
            editTodo={editTodo}
          />
        )
      )}
      {/* Modal for confirming task deletion */}
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          modal: "modal",
        }}
      >
        <h3 className="h3">Are you sure you want to delete this task?</h3>
        <h2>{todo?.task}</h2>
        <button onClick={onCloseModal}>No, Keep</button>
        <button className="h3" onClick={() => deleteTodo(todo?.id)}>
          Yes, Delete
        </button>
      </Modal>
    </div>
  );
}

export default TodoWrapper;
