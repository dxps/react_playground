import { ProductCardSkeleton } from './ProductCardSkeleton'

export default function ProductsSkeleton({ pageSize }: { pageSize: number }) {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: pageSize }).map((_, id) => (
				<ProductCardSkeleton key={id} />
			))}
		</div>
	)
}
