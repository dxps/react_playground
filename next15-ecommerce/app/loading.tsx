import { ProductCardSkeleton } from './ProductCardSkeleton'

export default function Loading() {
	return (
		// <div className="flex items-center justify-center h-screen">
		// 	<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
		// </div>
		<main className="container mx-auto">
			<h1 className="text-3xl font-bold mb-6">Home</h1>
			<p>Showing 7 products</p>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 7 }).map((_, id) => (
					<ProductCardSkeleton key={id} />
				))}
			</div>
		</main>
	)
}
