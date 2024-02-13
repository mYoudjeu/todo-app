import SubTodoModel from "models/SubTodoModel";

interface TodoModel {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
  isImportant: boolean;
  openSidebar: boolean;
  subtasks: SubTodoModel[];
}

export default TodoModel;
