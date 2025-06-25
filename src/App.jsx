import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')
  const inputRef = useRef(null)

  const addTodo = () => {
    if (input.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: input.trim(),
          completed: false,
        },
      ])
      setInput('')
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const filteredTodos =
    filter === 'all' ? todos :
    filter === 'active' ? todos.filter(t => !t.completed) :
    todos.filter(t => t.completed)

  return (
    <div className="todo-bg">
      <div className="todo-container">
        <header className="todo-header">
          <h1>TaskFlow</h1>
          <p>Organize your day with style</p>
        </header>
        <div className="todo-input-row">
          <input
            ref={inputRef}
            className="todo-input"
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTodo()}
          />
          <button className="todo-add-btn" onClick={addTodo} aria-label="Add task">+</button>
        </div>
        <div className="todo-filters">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
          <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
          <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
        </div>
        <ul className="todo-list">
          {filteredTodos.length === 0 && <li className="todo-empty">No tasks here!</li>}
          {filteredTodos.map(todo => (
            <li
              key={todo.id}
              className={`todo-item${todo.completed ? ' completed' : ''}`}
              onClick={() => toggleTodo(todo.id)}
            >
              <span className="todo-checkmark">{todo.completed ? '✔' : ''}</span>
              <span className="todo-text">{todo.text}</span>
              <button
                className="todo-delete-btn"
                onClick={e => { e.stopPropagation(); deleteTodo(todo.id) }}
                aria-label="Delete task"
              >×</button>
            </li>
          ))}
        </ul>
        <div className="todo-footer">
          <span>{todos.filter(t => !t.completed).length} tasks left</span>
          <button className="todo-clear-btn" onClick={clearCompleted}>Clear Completed</button>
        </div>
      </div>
    </div>
  )
}

export default App
