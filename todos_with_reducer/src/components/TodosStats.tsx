import type { JSX } from 'react'
import useTodos from '../hooks/useTodos'

export default function TodosStats(): JSX.Element {
	const { todos } = useTodos()
	return (
		<div className="todosStats">
			<h3>Stats</h3>
			<p>Total: {todos.length}</p>
		</div>
	)
}
