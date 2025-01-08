import { Link } from 'react-router-dom'

function UserNotFound() {
	return (
		<>
			<p>User not found</p>
			<Link to="/">Back to home</Link>
		</>
	)
}

export default UserNotFound
