import { Box } from '@mui/material'
import './App.css'
import Button from '@mui/material/Button'
import { FC } from 'react'

interface MySpecialBoxProps {
	label: string
	children: React.ReactNode
}

const MySpecialBox: FC<MySpecialBoxProps> = ({ label, children }) => {
	return (
		<Box border={1} padding={2} sx={{ borderRadius: 2 }}>
			label: {label}
			{children}
		</Box>
	)
}

function App() {
	return (
		<>
			<div>
				<h1>Hello MUI</h1>
			</div>
			<Button
				// Use sx to apply one off style.
				sx={{ backgroundColor: 'purple' }}
				variant="contained"
				disableElevation
				onClick={() => console.log('Button clicked!')}
			>
				My Button
			</Button>
			<MySpecialBox label="My Special Box">
				<Button variant="contained">My Button inside the box</Button>
			</MySpecialBox>
		</>
	)
}

export default App
