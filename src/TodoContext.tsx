// TodoContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from "uuid";
import TodoModel from "models/TodoModel"
import Data from 'models/DataModel';
import Todo from 'components/Todo';

uuidv4();

interface TodoContextProps {
  children: ReactNode;
}

interface TodoContextValue {
  todos: TodoModel[];
  addTodo: (newTodo: string) => void;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string, closeModal: any) => void;
  editTodo: (id: string) => void;
  editTask: (updatedTask: string, id: string) => void;
  reorder: (id : string) => void;
}

const TASKS = JSON.parse(localStorage.getItem("maviance-todos") || "[]");

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

export const TodoProvider: React.FC<TodoContextProps> = ({ children }) => {
  const [todos, setTodos] = useState<TodoModel[]>(TASKS);
  const [items, setItems] = useState<TodoModel[]>();

  const addTodo = (newTodo: string) => {
    setTodos((todos) => [
      ...todos,
      { id: uuidv4(), task: newTodo, completed: false, isEditing: false, isImportant: false },
    ]);
    console.log("todo list",todos);
                                                               
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

const reorder = (id: string) => {
  setTodos((todos) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isImportant: !todo.isImportant } : todo
    );

    // Find the index of the task with the specified ID
    const taskIndex = updatedTodos.findIndex((todo) => todo.id === id);

    // Move the task to the beginning of the array
    if (taskIndex !== -1) {
      const movedTask = updatedTodos.splice(taskIndex, 1)[0];
      const newIndex = movedTask.isImportant ? 0 : taskIndex;
      updatedTodos.splice(newIndex, 0, movedTask);
    }

    return updatedTodos;
  });
};



  const contextValue: TodoContextValue = {
    todos,
    addTodo,
    toggleComplete,
    deleteTodo,
    editTodo,
    editTask,
    reorder
  };

  React.useEffect(() => {
    localStorage.setItem('maviance-todos', JSON.stringify(todos));
  }, [todos]);

  return <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('context must be used within a TodoProvider');
  }
  
  return context;
};
