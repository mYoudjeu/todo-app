import React from "react";
import { render, fireEvent, act, cleanup } from "@testing-library/react";
import EditTodoForm from "components/EditTodoForm";
import "@testing-library/jest-dom/extend-expect";
import { TodoProvider } from "TodoContext";

const mockTask = {
  id: "1",
  task: "Test Task",
  completed: false,
  isEditing: true,
};

it("renders EditTodoForm component", () => {
  const { getByPlaceholderText } = render(
    <TodoProvider>
      <EditTodoForm task={mockTask} />
    </TodoProvider>
  );
  expect(getByPlaceholderText("Edit task")).toBeInTheDocument();
});

it("update or edit task", async () => {
  const { getByPlaceholderText, getByText } = render(
    <TodoProvider>
      <EditTodoForm task={mockTask} />
    </TodoProvider>
  );

  //find the edit task input and enter updated task and click the edit button
  const inputElement = getByPlaceholderText("Edit task");
  fireEvent.change(inputElement, { target: { value: "Updated Task" } });
 
    fireEvent.click(getByText("Edit"));
});
