import type { JSX } from 'react'
import { useAppSelector } from '../hooks/redux-hooks'

export default function TodosStats(): JSX.Element {
	const todos = useAppSelector((state) => state.todos)

	return (
		<div className="todosStats">
			<h3>Stats</h3>
			<p>Total: {todos.length}</p>
		</div>
	)
}
