import ProductsSkeleton from './ProductsSkeleton'

export default function Loading({ pageSize }: { pageSize: number }) {
	return (
		<main className="container mx-auto py-4">
			<ProductsSkeleton pageSize={pageSize} />
		</main>
	)
}
