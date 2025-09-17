import { useState } from 'react'
import './App.css'
import type { Todo } from './types'

const defaultTodos: Todo[] = [
	{
		id: 1,
		title: 'Todo 1',
		completed: false,
	},
	{
		id: 2,
		title: 'Todo 2',
		completed: false,
	},
	{
		id: 3,
		title: 'Todo 3',
		completed: false,
	},
]

function App() {
	const [todos, setTodos] = useState(defaultTodos)
	const [newTodo, setNewTodo] = useState<Todo>({
		id: Date.now(),
		title: '',
		completed: false,
	})

	function handleAddTodo() {
		setTodos([...todos, newTodo])
		setNewTodo({ id: Date.now(), title: '', completed: false })
	}

	return (
		<>
			<h1>Todos</h1>
			<input
				placeholder="Add a todo"
				value={newTodo.title}
				onChange={(e) => {
					setNewTodo((prev) => ({ ...prev, title: e.target.value }))
				}}
			/>
			<button onClick={handleAddTodo}>+</button>
			<div className="card">
				{todos.map((todo) => (
					<p key={todo.id}>{todo.title}</p>
				))}
			</div>
			<p className="read-the-docs">_</p>
		</>
	)
}

export default App
