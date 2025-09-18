import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Todo } from '../types'

const initialState: Todo[] = [
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

export const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<string>) => {
			return [
				...state,
				{ id: Date.now(), title: action.payload, completed: false },
			]
		},

		toggleTodo: (state, action: PayloadAction<number>) => {
			return state.map((todo) => {
				if (todo.id === action.payload) {
					return { ...todo, completed: !todo.completed }
				}
				return todo
			})
		},

		removeTodo: (state, action: PayloadAction<number>) => {
			return state.filter((todo) => todo.id !== action.payload)
		},
	},
})

export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions
export default todosSlice.reducer
