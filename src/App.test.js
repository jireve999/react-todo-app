import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { DragDropContext } from '@hello-pangea/dnd';
import todoReducer from './redux/todoSlice';
import App from './App';

// simulate @hello-pangea/dnd
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

const renderWithRedux = (component) => {
  const store = configureStore({
    reducer: { todos: todoReducer },
  });
  return render(
    <Provider store={store}>
      <DragDropContext onDragEnd={() => {}}>
        {component}
      </DragDropContext>
    </Provider>
  );
};

test('renders App component', () => {
  renderWithRedux(<App />);
  expect(screen.getByText(/PayPal TODO App/i)).toBeInTheDocument();
});