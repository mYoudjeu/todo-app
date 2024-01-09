import React, { useEffect, useState } from "react";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

// Generate a unique identifier using uuid which has 128 bit
uuidv4();

// Define the type for a single todo item
interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
}

// Fetch tasks from local storage and convert into a JavaScript object or use an empty array if none exist
const TASKS: TodoItem[] = JSON.parse(localStorage.getItem("maviance-todos") || "[]");

function TodoWrapper() {
  const [todos, setTodos] = useState<TodoItem[]>(TASKS);
  const [todo, setTodo] = useState<TodoItem | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [open, setOpen] = useState<boolean>(false);

  // Open modal with selected todo to delete todo
  const onOpenModal = (selectTodo: TodoItem) => {
    setTodo(selectTodo);
    setOpen(true);
  };

  // Close modal and reset todo state
  const onCloseModal = () => {
    setTodo(null);
    setOpen(false);
  };

  // Add new todo
  const addTodo = (newTodo: string) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: newTodo, completed: false, isEditing: false },
    ]);
  };

  // Switch complete status
  const toggleComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo and close the modal
  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    onCloseModal();
  };

  // Change editing status
  const editTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // Edit or update a task
  const editTask = (updatedTask: string, id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, task: updatedTask, isEditing: !todo.isEditing } : todo
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

  // Save todos to local storage every time the todos state is altered
  useEffect(() => {
    localStorage.setItem("maviance-todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="TodoWrapper">
      <h1>Get Tasks Done!</h1>
      <div className="form-and-filter">
        {/** Passing the addTodo as property to the TodoForm */}
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
        <div className=".delete-modal">
          <button onClick={onCloseModal}>No, Keep</button>
          <button className="h3" onClick={() => deleteTodo(todo?.id || "")}>
            Yes, Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default TodoWrapper;
