interface TodoModel {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
  isImportant: boolean;
  openSidebar: boolean;
}

export default TodoModel;
