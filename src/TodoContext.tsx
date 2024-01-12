// TodoContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from "uuid";
import Todo from "models/TodoModel"

uuidv4();

interface TodoContextProps {
  children: ReactNode;
}

interface TodoContextValue {
  todos: Todo[];
  addTodo: (newTodo: string) => void;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string, closeModal: any) => void;
  editTodo: (id: string) => void;
  editTask: (updatedTask: string, id: string) => void;
}

const TASKS = JSON.parse(localStorage.getItem("maviance-todos") || "[]");

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

export const TodoProvider: React.FC<TodoContextProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(TASKS);

  const addTodo = (newTodo: string) => {
    setTodos((todos) => [
      ...todos,
      { id: uuidv4(), task: newTodo, completed: false, isEditing: false },
    ]);5                                                           
  };

  const toggleComplete = (id: string) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string, closeModal: any ) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    closeModal
  };

  const editTodo = (id: string) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

 const editTask = (updatedTask: string, id: string) => {
  setTodos((todos) =>
    todos.map((todo) =>
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
