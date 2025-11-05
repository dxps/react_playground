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
			<Card className="min-w-96">
				<CardHeader className="gap-4">
					<CardTitle className="text-3xl font-bold">
						Minimal Tiptap
					</CardTitle>
					<CardDescription>...</CardDescription>
				</CardHeader>
				<CardContent>
					<MinimalTiptapDemo />
				</CardContent>
			</Card>
		</div>
	)
}

export default App
