import React from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import { reorderTodos } from './redux/todoSlice';

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(reorderTodos(items));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        <h1 className="title">PayPal TODO App</h1>
        <AddTodo />
        {todos.length > 0 && <TodoList />}
      </div>
    </DragDropContext>
  );
};

export default App;