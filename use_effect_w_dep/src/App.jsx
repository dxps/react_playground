import { useCallback, useEffect, useState } from 'react'
import './App.css'

function App() {
	const [id, setId] = useState('Loading ...')
	const [name, setName] = useState('Loading ...')
	const [counter, setCounter] = useState(0)

	const fetchUser = useCallback(() => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({ id: 1, name: 'Mike' })
			}, 1000)
		})
	}, [])

	useEffect(() => {
		fetchUser().then((user) => {
			setId(user.id)
			setName(user.name)
			console.log('[useEffect] Fetched user.')
		})
	}, [fetchUser])
	// Note that if we don't specify the dependency array
	// aka in line 23 we have just "})"
	// then the callback function will run on every component render!

	const changeCounter = () => {
		setCounter(Math.floor(Math.random() * 10))
	}

	return (
		<>
			<p>ID: {id}</p>
			<p>Name: {name}</p>
			<p>(counter: {counter})</p>
			<button onClick={changeCounter}>Change Counter</button>
		</>
	)
}

export default App
