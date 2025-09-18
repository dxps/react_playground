export interface Todo {
	id: number
	title: string
	completed: boolean
}

export type Action =
	| { type: 'add'; payload: { title: string } }
	| { type: 'remove'; payload: { id: number } }
	| { type: 'toggle'; payload: { id: number } }
