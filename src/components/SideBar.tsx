// SideBar.tsx
import { useTodoContext } from 'TodoContext';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import React, { useState, FormEvent, useEffect } from 'react';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubTodoModel from 'models/SubTodoModel';
import { faX } from '@fortawesome/free-solid-svg-icons';

function SideBar() {
  const { cTodo } = useTodoContext();
  const [subTasks, setSubTasks] = useState<SubTodoModel[]>([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    const storedSubtasks = JSON.parse(localStorage.getItem(`subtasks-${cTodo?.id}`) || '[]');
    setSubTasks(storedSubtasks);
  }, [cTodo]);
  

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (value.trim() !== '') {
      const newSubTask: SubTodoModel = { id: generateUniqueId(), parentId: cTodo?.id || '', subTask: value , completed:false};
      setSubTasks((prevSubTasks) => [...prevSubTasks, newSubTask]);
      setValue('');

      localStorage.setItem(`subtasks-${cTodo?.id}`, JSON.stringify([...subTasks, newSubTask]));
    }
  };

  const deleteTodo = (id: string ) => {
    setSubTasks((prevTodos) => prevTodos.filter((subTodo) => subTodo.id !== id));
  };

  const generateUniqueId = () => {
    return new Date().getTime().toString();
  };

  if (cTodo === null) return null;

  return (
    <div className='sidebar' style={{ display: 'flex', height: '100%', minHeight: '699px' }}>
      
      <Sidebar collapsed={false} backgroundColor="white">
        <Menu>
          <MenuItem>Task: {cTodo?.todo}</MenuItem>
          <p>Please add steps to your task</p>
          <form onSubmit={handleSubmit}>
            {subTasks.map((subTask, index) => (
              <MenuItem key={index}>
                <div className='form-and-filter'>
                <p className='sub-todo'>{subTask.subTask}</p>
                <FontAwesomeIcon
                  icon={faX} 
                  color='red'
                  onClick={() => deleteTodo(subTask.id)} 
                  />
                  </div>
              </MenuItem>
            ))}

            <div className="form-and-filter">
              <input
                size={5}
                type="text"
                value={value}
                className="sub-todo-input"
                placeholder="Enter a step"
                onChange={(e) => setValue(e.target.value)}
              />
              <br></br>
              <FontAwesomeIcon
                onClick={handleSubmit}
                icon={faPlusSquare}
                color='green'
              />
            </div>
          </form>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default SideBar;
