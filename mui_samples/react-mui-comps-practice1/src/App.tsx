// import { RouterProvider } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import './App.css'
import theme from './theme'
import Button from '@mui/material/Button'
import MySpecialBox from './components/MySpecialBox'

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
					sx={{
						backgroundColor: 'purple',
						borderColor: (theme) => theme.typography.h1.color,
						borderRadius: '7px',
						borderStyle: 'solid',
						borderWidth: '0px',
						boxShadow: 10,
						// Two examples of using CSS selectors within `sx` (to override MUI styles).
						'&:hover': {
							bgcolor: 'orange',
						},
						'&.MuiButton-contained': {
							bgcolor: 'gray',
						},
					}}
					variant="contained"
					disableElevation
					onClick={() => console.log('Button clicked!')}
				>
					My Purple Button
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
