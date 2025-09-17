import { createContext, useReducer } from 'react'
import type { Action, Todo } from '../types'
import { todosReducer } from '../reducers/todoReducer'

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

const initialContextValues = {
	todos: defaultTodos,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	dispatch: (_action: Action) => {},
}

const TodosContext = createContext(initialContextValues)

const TodosProvider = ({ children }: React.PropsWithChildren) => {
	const [todos, dispatch] = useReducer(todosReducer, defaultTodos)
	return (
		<TodosContext.Provider value={{ todos: todos, dispatch: dispatch }}>
			{children}
		</TodosContext.Provider>
	)
}

export { TodosContext, TodosProvider }
