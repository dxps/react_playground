import { useEffect, useState } from 'react'
import { fetchUsers, User } from './api'
import Users from './Users'

function UsersContainer() {
	const [users, setUsers] = useState<User[]>([])

	useEffect(() => {
		fetchUsers().then(setUsers)
	}, [])

	return <Users users={users} />
}

export default UsersContainer
