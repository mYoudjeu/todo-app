// TodoWrapper.tsx
import React from 'react';
import { TodoForm } from 'components/TodoForm';
import Todo from 'components/Todo';
import EditTodoForm from 'components/EditTodoForm';
import 'react-responsive-modal/styles.css';
import { useTodoContext } from 'TodoContext';
//import { useTodoContext } from '../TodoContext';
import { v4 as uuidv4 } from "uuid";
import SideBar from 'components/SideBar';
//import todoImage from "images/todoImage.jpg";

uuidv4();

function TodoWrapper() {
  const { todos, toggleComplete } = useTodoContext();
  const [filter, setFilter] = React.useState('all');

  const handleSubtaskToggleComplete = (id: string) => {
    // Update the main todo component state here
    toggleComplete(id)
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


  const importantTasks = filteredTodos.filter((task) => task.isImportant);
  const generalTasks = filteredTodos.filter((task) => !task.isImportant);

  const noTodosMessage = (
    <div>
      <h1 >Create your first Task !!!!</h1>
      <img src={require('todoImage.png')} alt='todo image' height={300} width={300} className='img' />
      <div className='todo-form'>
        <TodoForm />
      </div>
    </div>
  )
  document.body.classList.add("no-scroll")


  return (
    <div className='no-todo'>
      {todos.length === 0 ? (
        <div style={{ minWidth: '90%', margin: '100px' }}>{noTodosMessage} </div>
      ) : (
        <>

          <div className='form-and-filter' >

            <SideBar onSubtaskToggleComplete={handleSubtaskToggleComplete} />

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


              {importantTasks.length > 0 && (
                <div className="important-tasks">
                  <h5>IMPORTANT TASKS</h5>
                  {importantTasks.map((task, index) =>
                    <Todo task={task} key={index} />
                  )}
                </div>
              )}

              {generalTasks.length > 0 && (
                <div className="general-tasks">
                  <h5>GENERAL TASKS</h5>
                  {generalTasks.map((task, index) =>
                    task?.isEditing ? (<EditTodoForm task={task} key={index} />) :
                      <Todo task={task} key={index} />
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoWrapper;
