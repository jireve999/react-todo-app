import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../redux/todoSlice';
import AddTodo from './AddTodo';

const renderWithRedux = (component) => {
  const store = configureStore({
    reducer: { todos: todoReducer },
  });
  return render(<Provider store={store}>{component}</Provider>);
};

test('renders AddTodo component', () => {
  renderWithRedux(<AddTodo />);
  expect(screen.getByPlaceholderText('Add new todo')).toBeInTheDocument();
});

test('adds new todo', () => {
  renderWithRedux(<AddTodo />);
  const input = screen.getByPlaceholderText('Add new todo');
  const addButton = screen.getByText('Add');
  fireEvent.change(input, { target: { value: 'New Todo' } });
  fireEvent.click(addButton);
  expect(input.value).toBe('');
});