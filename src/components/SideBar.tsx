import { useTodoContext } from 'TodoContext';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import React, { useState, FormEvent, useEffect } from 'react';
import { faPlusSquare, faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCircle as circleSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubTodoModel from 'models/SubTodoModel';
import { faX } from '@fortawesome/free-solid-svg-icons';

interface SideBarProps {
  onSubtaskToggleComplete: (id: string) => void;
}

function SideBar({ onSubtaskToggleComplete }: SideBarProps) {
  const { cTodo } = useTodoContext();
  const [subTasks, setSubTasks] = useState<SubTodoModel[]>([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (cTodo) {
      const storedSubtasks = JSON.parse(localStorage.getItem(`subtasks-${cTodo.id}`) || '[]');
      setSubTasks(storedSubtasks);
    }
  }, [cTodo]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (value.trim() !== '') {
      const newSubTask: SubTodoModel = { id: generateUniqueId(), parentId: cTodo?.id || '', subTask: value, completed: false };
      setSubTasks((prevSubTasks) => [...prevSubTasks, newSubTask]);
      setValue('');

      localStorage.setItem(`subtasks-${cTodo?.id}`, JSON.stringify([...subTasks, newSubTask]));
    }
  };


  const toggleComplete = (id: string) => {
    // Toggle the completion status of the clicked subtask
    setSubTasks((subTasks) =>
      subTasks.map((subTask) =>
        subTask.id === id ? { ...subTask, completed: !subTask.completed } : subTask
      )
    );

    // Check if all subtasks are completed
    const allSubtasksCompleted = subTasks.every((subTask) => subTask.completed);

    // If not all subtasks are completed, execute onSubtaskToggleComplete
    if (!allSubtasksCompleted) {
      const updatedSubTasks = subTasks.map((subTask) =>
        subTask.id === id ? { ...subTask, completed: !subTask.completed } : subTask
      );
      localStorage.setItem(`subtasks-${cTodo?.id}`, JSON.stringify(updatedSubTasks));

      //onSubtaskToggleComplete(cTodo?.id || '');
    } else {
      const updatedSubTasks = subTasks.map((subTask) =>
        subTask.id === id ? { ...subTask, completed: !subTask.completed } : subTask
      );
      onSubtaskToggleComplete(cTodo?.id || '');
      localStorage.setItem(`subtasks-${cTodo?.id}`, JSON.stringify(updatedSubTasks));
    }
  };


  const deleteTodo = (id: string) => {
    setSubTasks((prevSubTasks) => {
      const updatedSubTasks = prevSubTasks.filter((subTodo) => subTodo.id !== id);
      localStorage.setItem(`subtasks-${cTodo?.id}`, JSON.stringify(updatedSubTasks));
      return updatedSubTasks;
    });
  };

  const generateUniqueId = () => {
    return new Date().getTime().toString();
  };

  if (cTodo === null) return null;

  return (
    <>
      <div className='sidebar' style={{ display: 'flex', height: '100%', minHeight: '699px' }}>

        <Sidebar collapsed={false} backgroundColor="white">
          <Menu>
            <MenuItem style={{ fontSize: 20, textAlign: 'center' }}>Task: {cTodo?.todo}</MenuItem>
            <p style={{ margin: 10 }}>Please add steps to your task</p>
            <form onSubmit={handleSubmit}>
              {subTasks.map((subTask, index) => (
                <MenuItem key={index}>
                  <div className='form-and-filter'>
                    <FontAwesomeIcon
                      icon={subTask.completed ? circleSolid : faCircle}
                      color="#3e69e4"
                      onClick={() => toggleComplete(subTask.id)}
                      style={{ width: 40 }}
                    />
                    <p className='sub-todo'>{subTask.subTask}</p>
                    <FontAwesomeIcon
                      icon={faX}
                      color='red'
                      onClick={() => deleteTodo(subTask.id)}
                    />
                  </div>
                </MenuItem>
              ))}

              {cTodo.parentComplete ? null :
                <div className="form-and-filter" >
                  <input
                    style={{ margin: 10, width: 170 }}
                    size={70}
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
                    style={{ marginTop: 10, margin: 1 }}
                  />
                </div>
              }
            </form>
          </Menu>
        </Sidebar>
      </div>
    </>

  );
}

export default SideBar;
