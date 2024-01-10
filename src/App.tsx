// App.tsx
import React from 'react';
import './App.css'

import TodoWrapper from './components/TodoWrapper';
import { TodoProvider } from './TodoContext';

const App: React.FC = () => {
  return (
    <TodoProvider>
      <TodoWrapper />
    </TodoProvider>
  );
};

export default App;
