import './App.css'
import Search from './components/Search'

function App() {
	return (
		<>
			<h2>Debounced Search</h2>
			<div className="card">
				<Search />
			</div>
			<p className="read-the-docs">
				This view shows how to implement and use debounce feature using
				a custom hook. Open the console to see the debounce in action:
				it waits a second of idle time before using the value, and it
				checks if the value has more than 3 characters.
			</p>
		</>
	)
}

export default App
