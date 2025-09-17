import type { Action, Todo } from '../types'

export function todosReducer(state: Todo[], action: Action): Todo[] {
	switch (action.type) {
		case 'add':
			return [
				...state,
				{
					id: Date.now(),
					title: action.payload.title,
					completed: false,
				},
			]
		case 'remove':
			return state.filter((todo) => todo.id !== action.payload.id)
		case 'toggle':
			return state.map((todo) => {
				if (todo.id === action.payload.id) {
					return { ...todo, completed: !todo.completed }
				}
				return todo
			})
	}
}
