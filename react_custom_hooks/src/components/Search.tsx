import { useEffect, useState, type JSX } from 'react'
import useDebounce from '../hooks/useDebounce'

export default function Search(): JSX.Element {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const debounceSearchTerm = useDebounce(searchTerm, 1000)

	const handleSearch = (searchTerm: string) => {
		console.log('Searching for ', searchTerm)
	}

	useEffect(() => {
		if (debounceSearchTerm.trim().length > 3) {
			handleSearch(debounceSearchTerm)
		}
	}, [debounceSearchTerm])

	return (
		<div>
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
		</div>
	)
}
