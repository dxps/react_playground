import { Box } from '@mui/material'

interface MySpecialBoxProps {
	label: string
	children: React.ReactNode
}
const MySpecialBox = ({ label, children }: MySpecialBoxProps) => {
	return (
		<Box
			border={1.4}
			borderColor={'#777777'}
			margin={2}
			padding={2}
			sx={{ borderRadius: 2 }}
		>
			<span style={{ paddingRight: 10 }}>label: {label}</span>
			{children}
		</Box>
	)
}

export default MySpecialBox
