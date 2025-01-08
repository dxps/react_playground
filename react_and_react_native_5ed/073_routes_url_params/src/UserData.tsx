import { User } from './api'

type UserDataProps = {
	user: User
}

function UserData({ user }: UserDataProps) {
	return (
		<section>
			<p>First name: {user.first}</p>
			<p>Last name: {user.last}</p>
			<p>Age: {user.age}</p>
		</section>
	)
}

export default UserData
