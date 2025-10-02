import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard, Navbar } from './components'

function App() {
	return (
		<div className="h-[100vh]">
			<Router>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/navbar" element={<Navbar />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
