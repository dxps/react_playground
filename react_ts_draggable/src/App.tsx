import React, { useState } from 'react'
import Popup from './components/popup'

const App: React.FC = () => {
	const [isPopupOpen, setIsPopupOpen] = useState(false)
	const openPopup = () => setIsPopupOpen(true)
	const closePopup = () => setIsPopupOpen(false)

	return (
		<div className="App">
			<button onClick={openPopup}>Open Popup</button>
			<Popup isOpen={isPopupOpen} onClose={closePopup}>
				<p>This is a popup!</p>
			</Popup>
		</div>
	)
}

export default App
