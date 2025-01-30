import { createTheme } from '@mui/material'

const theme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			default: '#303030',
		},
		primary: {
			main: '#1976d2',
		},
		secondary: {
			main: '#9c27b0',
		},
		text: {
			primary: '#e8e8e8',
		},
	},
	shape: {
		borderRadius: 5,
	},
	typography: {
		allVariants: {
			textTransform: 'none',
		},
		fontFamily: ['Supreme-Regular'].join(','),
	},
})

export default theme
