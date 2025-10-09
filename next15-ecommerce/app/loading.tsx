import ProductsSkeleton from './ProductsSkeleton'

export default function Loading({ pageSize }: { pageSize: number }) {
	return (
		<main className="container mx-auto">
			<h1 className="text-3xl font-bold mb-6">Home</h1>
			<p>Showing 7 products</p>
			<ProductsSkeleton pageSize={pageSize} />
		</main>
	)
}
