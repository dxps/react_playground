import './ListOfTodos.css'
import { useState, type JSX } from 'react'

import type { Todo } from '../types'
import useTodos from '../hooks/useTodos'

export default function ListOfTodos(): JSX.Element {
	const [newTodoTitle, setNewTodoTitle] = useState('')
	const { todos, dispatch } = useTodos()

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
		<div className="todosList">
			<h3>Todo List</h3>
			<input
				name="newTodoTitle"
				placeholder="Add a todo"
				value={newTodoTitle}
				onChange={(e) => setNewTodoTitle(e.target.value)}
			/>
			<button className="addTodoBtn" onClick={handleAddTodo}>
				+
			</button>

			<ul>
				{todos.map((todo) => (
					<TodoItem todo={todo} key={todo.id} />
				))}
			</ul>
		</div>
	)
}

function TodoItem({ todo }: { todo: Todo }): JSX.Element {
	const { dispatch } = useTodos()

	function handleRemoveTodo() {
		dispatch({
			type: 'remove',
			payload: {
				id: todo.id,
			},
		})
	}

	return (
		<li>
			{todo.title}{' '}
			<button className="removeTodoBtn" onClick={handleRemoveTodo}>
				x
			</button>
		</li>
	)
}
