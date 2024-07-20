import todoReducer, { addTodo, deleteTodo, toggleTodo, reorderTodos } from './todoSlice';

describe('todo reducer', () => {
  test('should handle initial state', () => {
    expect(todoReducer(undefined, {})).toEqual([]);
  });

  test('should handle addTodo', () => {
    const initialState = [];
    const newTodo = { title: 'Test Todo', priority: 'medium' };
    const action = addTodo(newTodo);
    const state = todoReducer(initialState, action);
    expect(state.length).toBe(1);
    expect(state[0].title).toBe('Test Todo');
  });

  test('should handle deleteTodo', () => {
    const initialState = [{ id: '1', title: 'Test Todo', priority: 'medium', completed: false }];
    const action = deleteTodo('1');
    const state = todoReducer(initialState, action);
    expect(state.length).toBe(0);
  });

  test('should handle toggleTodo', () => {
    const initialState = [{ id: '1', title: 'Test Todo', priority: 'medium', completed: false }];
    const action = toggleTodo('1');
    const state = todoReducer(initialState, action);
    expect(state[0].completed).toBe(true);
  });

  test('should handle reorderTodos', () => {
    const initialState = [
      { id: '1', title: 'Todo 1', priority: 'medium', completed: false },
      { id: '2', title: 'Todo 2', priority: 'high', completed: false },
    ];
    const reorderedTodos = [
      { id: '2', title: 'Todo 2', priority: 'high', completed: false },
      { id: '1', title: 'Todo 1', priority: 'medium', completed: false },
    ];
    const action = reorderTodos(reorderedTodos);
    const state = todoReducer(initialState, action);
    expect(state).toEqual(reorderedTodos);
  });
});