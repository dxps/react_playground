import './ListOfTodos.css'
import { useState, type JSX } from 'react'
import type { Todo } from '../types'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { addTodo, removeTodo } from '../features/todos'

export default function ListOfTodos(): JSX.Element {
	const [newTodoTitle, setNewTodoTitle] = useState('')
	const todos = useAppSelector((state) => state.todos)
	const dispatch = useAppDispatch()

	function handleAddTodo() {
		dispatch(addTodo(newTodoTitle))
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
	const dispatch = useAppDispatch()

	function handleRemoveTodo() {
		dispatch(removeTodo(todo.id))
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
