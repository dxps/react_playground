// import { RouterProvider } from 'react-router-dom'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import './App.css'
import theme from './theme'
import Button from '@mui/material/Button'

interface MySpecialBoxProps {
	label: string
	children: React.ReactNode
}
const MySpecialBox = ({ label, children }: MySpecialBoxProps) => {
	return (
		<Box border={1} padding={2} sx={{ borderRadius: 2 }}>
			label: {label}
			{children}
		</Box>
	)
}

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{/* <RouterProvider router={router} /> */}
			<>
				<div>
					<h1>Hello MUI</h1>
				</div>
				<Button
					// sx is used to apply one-off style.
					sx={{ backgroundColor: 'purple' }}
					variant="contained"
					disableElevation
					onClick={() => console.log('Button clicked!')}
				>
					My Button
				</Button>
				<MySpecialBox label="My Special Box">
					<Button variant="contained">
						My Button inside the box
					</Button>
				</MySpecialBox>
			</>
		</ThemeProvider>
	)
}

export default App
