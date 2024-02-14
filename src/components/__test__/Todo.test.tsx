// Todo.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Todo from 'components/Todo';
import "@testing-library/jest-dom/extend-expect";
import { TodoProvider } from 'TodoContext';

const mockTask = {
  id: '1',
  task: 'Test Task',
  completed: false,
  isImportant: false,
  isEditing: false,
};

test('renders Todo component', () => {
  const deleteTodoMock = jest.fn();
  const { getByTestId } = render(
    <TodoProvider>
      <Todo task={mockTask} />
    </TodoProvider>
  );
  expect(getByTestId('deleteButton')).toBeInTheDocument();
  expect(getByTestId('editButton')).toBeInTheDocument();
});

test('calls deleteTodo when delete button is clicked', () => {
  const deleteTodoMock = jest.fn();
  const mock = {
    id: '1',
    task: 'Test Task',
    completed: false,
    isImportant: false,
    isEditing: false,
  };

  const { getByTestId, getByText } = render(
    <TodoProvider>
      <Todo
        task={mock}
      />
    </TodoProvider>
  );

  fireEvent.click(getByTestId('deleteButton'));

  expect(deleteTodoMock).toHaveBeenCalledWith(mock.id);

});

test('calls EditTodoForm when edit button is clicked', () => {
  const todoMock = jest.fn();
  const mock = {
    id: '1',
    task: 'Test Task',
    completed: false,
    isImportant: false,
    isEditing: false,
  };

  const { getByTestId, getByText } = render(
    <TodoProvider>
      <Todo
        task={mock}
      />
    </TodoProvider>
  );

  fireEvent.click(getByTestId('editButton'));

});

