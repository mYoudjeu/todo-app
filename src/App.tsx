// App.tsx
import React from 'react';
import 'App.css'
import SideBar from 'components/SideBar';

import TodoWrapper from 'components/TodoWrapper';
import { TodoProvider } from 'TodoContext';

const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className='form-and-filter'>
      <SideBar />
      <TodoWrapper />
      </div>
    </TodoProvider>
  );
};

export default App;
