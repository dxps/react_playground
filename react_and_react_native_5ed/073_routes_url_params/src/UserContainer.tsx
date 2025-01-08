import { Link, useLoaderData, useParams } from 'react-router-dom'
import { User } from './api'
import UserData from './UserData'

function UserContainer() {
	const params = useParams()
	const { user } = useLoaderData() as { user: User }

	return (
		<>
			<div>
				User id: {params.id}
				<UserData user={user} />
			</div>
			<Link to="/">Back</Link>
		</>
	)
}

export default UserContainer
