// TodoWrapper.tsx
import React from 'react';
import { TodoForm } from 'components/TodoForm';
import Todo from 'components/Todo';
import EditTodoForm from 'components/EditTodoForm';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useTodoContext } from 'TodoContext';
//import { useTodoContext } from '../TodoContext';
import { v4 as uuidv4 } from "uuid";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

uuidv4();


function TodoWrapper() {
  const { todos, deleteTodo } = useTodoContext();
  const [todo, setTodo] = React.useState<TodoItem | null>(null);
  const [filter, setFilter] = React.useState('all');
  const [open, setOpen] = React.useState(false);

   interface TodoItem {
    id: string;
    task: string;
    completed: boolean;
    isEditing: boolean;
  }

  const onOpenModal = (selectTodo : TodoItem) => {
    setTodo(selectTodo);
    setOpen(true);
  };

  const onCloseModal = () => {
    setTodo(null);
    setOpen(false);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'completed') {
      return todo.completed;
    } else if (filter === 'uncompleted') {
      return !todo.completed;
    }
    return true;
  });



  return (
   
    <div className="TodoWrapper">
      <h1>Get Tasks Done!</h1>
      <div className="form-and-filter">
        <TodoForm />
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
    
      {filteredTodos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm task={todo} key={index} />
        ) : (
          <Todo
            task={todo}
            key={index}
            deleteTodo={() => onOpenModal(todo)}
          />
        )
      )}

      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          modal: 'modal',
        }} 
        data-testid = "delmodal"
      >
        <h3 className="h3">Are you sure you want to delete this task?</h3>
        <h2>{todo?.task}</h2>
        <div className=".delete-modal">
          <button onClick={onCloseModal}>No, Keep</button>
          <button className="h3" onClick={() => deleteTodo(todo?.id || '', onCloseModal() )}>
            Yes, Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default TodoWrapper;
