import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import './index.css'
import MinimalTiptapDemo from './components/MinimalTiptapDemo'

export function App() {
	return (
		<div className="container mx-auto p-8 relative z-10">
			<div className="min-w-96">
				<MinimalTiptapDemo />
			</div>
		</div>
	)
}

export default App
