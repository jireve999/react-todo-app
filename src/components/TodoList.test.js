import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { DragDropContext } from '@hello-pangea/dnd';
import todoReducer from '../redux/todoSlice';
import TodoList from './TodoList';

jest.mock('@hello-pangea/dnd', () => ({
  Droppable: ({ children }) => children({
    draggedOver: false,
    innerRef: jest.fn(),
  }, {}),
  Draggable: ({ children }) => children({
    dragging: false,
    draggedOver: false,
    innerRef: jest.fn(),
  }, {}),
  DragDropContext: ({ children }) => children,
}));

const renderWithRedux = (component, { initialState } = {}) => {
  const store = configureStore({
    reducer: { todos: todoReducer },
    preloadedState: { todos: initialState },
  });
  return render(
    <Provider store={store}>
      <DragDropContext onDragEnd={() => {}}>
        {component}
      </DragDropContext>
    </Provider>
  );
};

test('renders todo items', () => {
  const initialTodos = [
    { id: '1', title: 'Test Todo', priority: 'medium', completed: false },
  ];
  renderWithRedux(<TodoList />, { initialState: initialTodos });
  expect(screen.getByText('Test Todo')).toBeInTheDocument();
});

test('toggles todo completion', () => {
  const initialTodos = [
    { id: '1', title: 'Test Todo', priority: 'medium', completed: false },
  ];
  renderWithRedux(<TodoList />, { initialState: initialTodos });
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});