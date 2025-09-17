import { useState, useReducer } from 'react'
import './App.css'
import type { Todo } from './types'
import { todosReducer } from './reducers/todoReducer'

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
	const [todos, dispatch] = useReducer(todosReducer, defaultTodos)
	const [newTodoTitle, setNewTodoTitle] = useState('')

	function handleAddTodo() {
		dispatch({
			type: 'add',
			payload: {
				title: newTodoTitle,
			},
		})
		setNewTodoTitle('')
	}

	return (
		<>
			<h1>Todos</h1>
			<input
				name="newTodoTitle"
				placeholder="Add a todo"
				value={newTodoTitle}
				onChange={(e) => setNewTodoTitle(e.target.value)}
			/>
			<button onClick={handleAddTodo}>+</button>
			<div className="card">
				{todos.map((todo) => (
					<p key={todo.id}>
						{todo.id}. {todo.title}
					</p>
				))}
			</div>
			<p className="read-the-docs">_</p>
		</>
	)
}

export default App
