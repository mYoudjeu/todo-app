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
  const { toggleComplete, reorder, currentTodo, cTodo, deleteTodo } = useTodoContext();
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


  const SUB_TASK = JSON.parse(localStorage.getItem(`subtasks-${cTodo?.id}`) || "[]");



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

            <p
              {...() => toggleComplete(task.id)}
              className={`${task.completed ? "completed" : ""}`}
            >
              {task.task}
            </p>
            <p>
              ({subTaskCount} subtasks)
            </p>
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
            <button onClick={() => { deleteTodo(task.id); closeModal(); }}>Yes, Delete</button>
            <button onClick={closeModal}>No, Keep</button>
          </Modal>
        </div>

      )}
    </>
  );
};

export default Todo;
