import { Link } from 'react-router-dom'
import { User } from './api'

type UsersProps = {
	users: User[]
}

function Users({ users }: UsersProps) {
	return (
		<ul>
			{users.map((user, idx) => (
				<li key={idx}>
					<Link to={`/users/${idx}`}>{user.first}</Link>
				</li>
			))}
		</ul>
	)
}

export default Users
