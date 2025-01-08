import { RouteObject } from 'react-router-dom'
import Redirect from '../Redirect'
import First from './First'
import Second from './Second'

const routes: RouteObject = {
	path: '/one',
	children: [
		{
			index: true,
			element: <Redirect to="/one/1" />,
		},
		{
			path: '1',
			element: <First />,
		},
		{
			path: '2',
			element: <Second />,
		},
	],
}

export default routes
