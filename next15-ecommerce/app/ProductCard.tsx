import { Product } from '@/lib/mocks'
import Image from 'next/image'

export function ProductCard({ product }: { product: Product }) {
	return (
		<div className="border border-gray-200 rounded-lg p-4">
			<div className="relative aspect-video">
				<Image
					src={product.image}
					alt={product.name}
					fill
					className="object-cover"
				/>
			</div>
			<h2 className="text-lg font-semibold mb-2">{product.name}</h2>
			<p className="text-gray-500">${product.price.toFixed(2)}</p>
			<p className="text-gray-600">{product.description}</p>
		</div>
	)
}
