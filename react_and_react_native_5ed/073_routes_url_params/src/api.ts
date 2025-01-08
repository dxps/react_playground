export type User = {
	first: string
	last: string
	age: number
}

const users: User[] = [
	{
		first: 'John',
		last: 'Doe',
		age: 30,
	},
	{
		first: 'Jane',
		last: 'Doe',
		age: 25,
	},
]

export function fetchUsers(): Promise<User[]> {
	return new Promise((resolve) => {
		resolve(users)
	})
}

export function fetchUser(id: number): Promise<User> {
	return new Promise((resolve, reject) => {
		const user = users[id]

		if (user === undefined) {
			reject(`User with id ${id} not found`)
		} else {
			resolve(user)
		}
	})
}
