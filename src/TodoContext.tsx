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
  cTodo: currentTodoModel|null;
  sTodo: SubTodoModel[]
  addTodo: (newTodo: string) => void;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string, closeModal: any) => void;
  editTodo: (id: string) => void;
  editTask: (updatedTask: string, id: string) => void;
  reorder: (id : string) => void;
  currentTodo: (task : string, id:string) => void

}
const TASKS = JSON.parse(localStorage.getItem("maviance-todos") || "[]");
const SUB_TASK = JSON.parse(localStorage.getItem("subTodo") || "[]");


const TodoContext = createContext<TodoContextValue | undefined>(undefined);

export const TodoProvider: React.FC<TodoContextProps> = ({ children }) => {
  const [todos, setTodos] = useState<TodoModel[]>(TASKS);
  const [cTodo, setCTodo] = useState<currentTodoModel|null>(null);
  const [sTodo, setSTodo] = useState<SubTodoModel[]>(SUB_TASK)

  const addTodo = (newTodo: string) => {
    setTodos((todos) => [
      ...todos,
      { id: uuidv4(), task: newTodo, completed: false, isEditing: false, isImportant: false, openSidebar:false },
    ]);                                                         
  };

  const currentTodo = (task: string, id:string) => {
    setCTodo(
      {todo: task, id:id, openBar: true }
      );  
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

    // Find the index of the task
    const taskIndex = updatedTodos.findIndex((todo) => todo.id === id);

    // Move the task to the beginning of the array
    if (taskIndex !== -1) {
      const removeTask = updatedTodos.splice(taskIndex, 1)[0];
      if (removeTask.isImportant){
      updatedTodos.splice(0, 0, removeTask); }
      else {  
        updatedTodos.splice(updatedTodos.length,0, removeTask)
    } 
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
    reorder,
    currentTodo,
    cTodo,
    sTodo,
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