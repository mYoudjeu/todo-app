// TodoWrapper.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoWrapper from 'components/TodoWrapper';
import "@testing-library/jest-dom/extend-expect";
import { TodoProvider } from 'TodoContext';

test('renders TodoWrapper component', () => {
  const { getByText } = render(
    <TodoProvider>
      <TodoWrapper />
    </TodoProvider>
  );
  expect(getByText('Get Tasks Done!')).toBeInTheDocument();
});

test('adds a new todo when using TodoForm', () => {
  const { getByPlaceholderText, getByText } = render(
    <TodoProvider>
      <TodoWrapper />
    </TodoProvider>
  );

  const inputElement = getByPlaceholderText('What is your new task?');
  fireEvent.change(inputElement, { target: { value: 'New Task' } });
  fireEvent.click(getByText('Add'));

  expect(getByText('New Task')).toBeInTheDocument();
});

test('toggles the filter dropdown and updates the displayed todos', () => {
  const { getByText, getByDisplayValue } = render(
    <TodoProvider>
      <TodoWrapper />
    </TodoProvider>
  );

  fireEvent.change(getByDisplayValue('All'), { target: { value: 'completed' } });
});
