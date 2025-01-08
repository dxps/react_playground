import { Link, Outlet } from 'react-router-dom'
import './Layout.css'

function Layout() {
	return (
		<main>
			<nav>
				<Link to="/">Home</Link>
				<span> | </span>
				<Link to="/one">One</Link>
				<span> | </span>
				<Link to="/two">Two</Link>
			</nav>

			<Outlet />
		</main>
	)
}

export default Layout
