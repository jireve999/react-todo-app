import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ 
        id: Date.now().toString(), 
        title: action.payload.title, 
        priority: action.payload.priority, 
        completed: false 
      });
    },
    deleteTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    reorderTodos: (state, action) => {
      return action.payload;
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo, reorderTodos } = todoSlice.actions;
export default todoSlice.reducer;