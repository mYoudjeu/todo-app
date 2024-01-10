// TodoForm.tsx
import React, { useState, useRef, FormEvent } from 'react';
import { Modal } from 'react-responsive-modal';
import { useTodoContext } from '../TodoContext';

interface TodoFormProps {
}

const TodoForm: React.FC<TodoFormProps> = () => {
  const { addTodo } = useTodoContext();
  const [value, setValue] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const myRef = useRef(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (value.trim() !== '') {
      addTodo(value);
      setValue('');
    } else {
      setOpen(true);
    }
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        className="todo-input"
        placeholder="What is your new task?"
        onChange={(e) => setValue(e.target.value)}
      />

      <button type="submit" className="todo-btn">
        Add
      </button>

      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          modal: 'modal',
        }}
      >
        <h3 className="h3">Please enter a task before adding.</h3>
      </Modal>
    </form>
  );
};

export { TodoForm };
