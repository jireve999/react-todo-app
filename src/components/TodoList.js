import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { deleteTodo, toggleTodo } from '../redux/todoSlice';

const priorityOrder = {
  high: 3,
  medium: 2,
  low: 1
};

const TodoList = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
  }, [todos]);

  return (
    <Droppable droppableId="todos">
      {(provided) => (
        <ul {...provided.droppableProps} ref={provided.innerRef} className="todo-list">
          {sortedTodos.map((todo, index) => (
            <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
              {(provided) => (
                <li
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`todo-item ${todo.completed ? 'completed' : ''}`}
                >
                  <span className="todo-content">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => dispatch(toggleTodo(todo.id))}
                      className="checkbox"
                    />
                    <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>{todo.title}</span>
                    <span className="todo-priority">Priority: {todo.priority}</span>
                  </span>
                  <button
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default TodoList;