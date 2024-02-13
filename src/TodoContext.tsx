// TodoContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from "uuid";
import TodoModel from "models/TodoModel"
import currentTodoModel from 'models/currentTodoModel';
import SubTodoModel from 'models/SubTodoModel';

uuidv4();

interface TodoContextProps {
  children: ReactNode;
}

interface TodoContextValue {
  todos: TodoModel[];
  cTodo: currentTodoModel | null;
  sTodo: SubTodoModel[]
  addTodo: (newTodo: string) => void;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTask: (updatedTask: string, id: string) => void;
  reorder: (id: string) => void;
  currentTodo: (task: string, id: string, parentComplete: boolean) => void
  addSubTodo: (subTodo: string, parentId: string, parentComplete: boolean) => void;


}
const TASKS = JSON.parse(localStorage.getItem("maviance-todos") || "[]");
const SUB_TASK = JSON.parse(localStorage.getItem("subTodo") || "[]");


const TodoContext = createContext<TodoContextValue | undefined>(undefined);

export const TodoProvider: React.FC<TodoContextProps> = ({ children }) => {
  const [todos, setTodos] = useState<TodoModel[]>(TASKS);
  const [cTodo, setCTodo] = useState<currentTodoModel | null>(null);
  const [sTodo, setSTodo] = useState<SubTodoModel[]>(SUB_TASK)

  const addTodo = (newTodo: string) => {
    setTodos((todos) => [
      ...todos,
      {

        SUB_TASK: JSON.parse(localStorage.getItem(`subtasks-${cTodo?.id}`) || "[]"),
        id: uuidv4(), task: newTodo, completed: false, isEditing: false, isImportant: false, openSidebar: false, subtasks: SUB_TASK
      },
    ]);

  };

  const addSubTodo = (subTodo: string, parentId: string) => {
    setSTodo((sTodo) => [
      ...sTodo,
      {
        id: uuidv4(), subTask: subTodo, parentId: parentId, completed: false
      },
    ]);
  };


  const currentTodo = (task: string, id: string, parentComplete: boolean) => {
    setCTodo(
      { todo: task, id: id, openBar: true, parentComplete: parentComplete }
    );
  };


  const toggleComplete = (id: string) => {

    const subTasksForCurrentTask = JSON.parse(localStorage.getItem(`subtasks-${id}`) || '[]');

    // Check if all subtasks are completed
    const allSubtasksCompleted = subTasksForCurrentTask.every((subTask: SubTodoModel) => subTask.completed);

    if (allSubtasksCompleted || !subTasksForCurrentTask) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } else {
      alert("Complete all subtasks first!")
    }


  };


  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

  };

  const editTask = (updatedTask: string, id: string) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, task: updatedTask, isEditing: !todo.isEditing } : todo
      )
    );
  };


  const reorder = (id: string) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isImportant: !todo.isImportant } : todo
      )
    );
  };


  const contextValue: TodoContextValue = {
    todos,
    addTodo,
    toggleComplete,
    deleteTodo,
    editTask,
    reorder,
    currentTodo,
    cTodo,
    sTodo,
    addSubTodo,
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

export const createNewTodo = (type: string, payload: TodoModel) => ({
  type,
  payload
})