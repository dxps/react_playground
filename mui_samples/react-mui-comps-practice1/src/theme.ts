import { createTheme } from '@mui/material'

const theme = createTheme({
	palette: {
		mode: 'light',
		background: {
			default: '#e6e6e6',
		},
	},
	typography: {
		allVariants: {
			textTransform: 'none',
		},
		fontFamily: ['Supreme-Regular'].join(','),
	},
})

export default theme
