// TodoContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from "uuid";

uuidv4();

interface TodoContextProps {
  children: ReactNode;
}

interface Todo {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
}

interface TodoContextValue {
  todos: Todo[];
  addTodo: (newTodo: string) => void;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string) => void;
  editTask: (updatedTask: string, id: string) => void;
}

const TASKS = JSON.parse(localStorage.getItem("maviance-todos") || "[]");

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

export const TodoProvider: React.FC<TodoContextProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(TASKS);

  const addTodo = (newTodo: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: uuidv4(), task: newTodo, completed: false, isEditing: false },
    ]);
  };

  const toggleComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

 const editTask = (updatedTask: string, id: string) => {
  setTodos((prevTodos) =>
    prevTodos.map((todo) =>
      todo.id === id ? { ...todo, task: updatedTask, isEditing: !todo.isEditing } : todo
    )
  );
};

  const contextValue: TodoContextValue = {
    todos,
    addTodo,
    toggleComplete,
    deleteTodo,
    editTodo,
    editTask,
  };

  React.useEffect(() => {
    localStorage.setItem('maviance-todos', JSON.stringify(todos));
  }, [todos]);

  return <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  
  return context;
};
