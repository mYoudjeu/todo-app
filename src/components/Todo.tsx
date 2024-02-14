import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPenToSquare, faStar } from "@fortawesome/free-regular-svg-icons";
import { faTrash, faStar as starSolid, faCircle as circleSolid } from "@fortawesome/free-solid-svg-icons";
import { useTodoContext } from "TodoContext";
import { Modal } from 'react-responsive-modal';
import EditTodoForm from "components/EditTodoForm";

interface TodoProps {
  task: {
    id: string;
    task: string;
    completed: boolean;
    isImportant: boolean;
    isEditing: boolean;
  };
}

// Todo component for displaying a single todo item
const Todo: React.FC<TodoProps> = ({ task }) => {
  const { toggleComplete, reorder, currentTodo, cTodo, deleteTodo, todos } = useTodoContext();
  const [isImportant, setIsImportant] = useState(task.isImportant);
  const [subTaskCount, setSubTaskCount] = useState<number>(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(task.isEditing);


  useEffect(() => {
    setIsImportant(task.isImportant);
    setIsEditing(task.isEditing);
  }, [task.isImportant, task.isEditing]);

  useEffect(() => {
    // Fetch the number of subtasks for the current task
    const subTasks = JSON.parse(localStorage.getItem(`subtasks-${task.id}`) || "[]");
    setSubTaskCount(subTasks.length);
  }, [task.id]);

  const handleStarClick = () => {
    reorder(task.id);
  };

  const handleDelete = () => {
    // Open the delete modal
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    // Close the delete modal
    setShowDeleteModal(false);
  };

  const handleEdit = () => {
    // Toggle the editing state
    setIsEditing(!isEditing);
  };




  return (
    <>
      {isEditing ? (
        <EditTodoForm
          task={task}
        />
      ) : (
        <div className="Todo">
          {/* Click event to call complete class */}
          <div className="circle-icon">
            <FontAwesomeIcon
              icon={task.completed ? circleSolid : faCircle}
              color="#3e69e4"
              onClick={() => toggleComplete(task.id)}
            />
          </div>
          <div className="todo-display" onClick={() => currentTodo(task.task, task.id, task.completed)}>
            <div >
              <p style={{ marginTop: '-2px' }}
                {...() => toggleComplete(task.id)}
                className={`${task.completed ? "completed" : ""}`}
              >
                {task.task}
              </p>
            </div>
            <div style={{ width: '100%' }}>
              <p style={{ marginBottom: '3px', marginTop: '-15px', fontSize: '13px' }}>
                {subTaskCount} subtasks
              </p>
            </div>
          </div>

          <FontAwesomeIcon
            data-testid="editButton"
            icon={faPenToSquare}
            color="#3e69e4"
            onClick={handleEdit}
          />
          <FontAwesomeIcon
            icon={isImportant ? starSolid : faStar}
            onClick={handleStarClick}
            type="submit"
            color="#3e69e4"
          />
          <FontAwesomeIcon
            data-testid="deleteButton"
            icon={faTrash}
            color="#a80000"
            onClick={handleDelete}
          />

          <Modal
            open={showDeleteModal}
            onClose={closeModal}
            center
            classNames={{
              modal: 'modal',
            }}
          >

            <h3>Are you sure you want to delete this task?</h3>
            <div>
              <button className="delete-btn" onClick={() => { deleteTodo(task.id); closeModal(); }}>Yes, Delete</button>
              <button className="keep-btn" style={{ marginLeft: '195px' }} onClick={closeModal}>No, Keep</button>
            </div>
          </Modal>
        </div>

      )}
    </>
  );
};

export default Todo;
