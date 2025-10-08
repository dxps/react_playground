import { Product } from '@/lib/mocks'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'

export function ProductCard({ product }: { product: Product }) {
	return (
		<div className="border border-gray-200 rounded-lg p-4">
			<div className="relative aspect-video">
				<Image
					src={product.image}
					alt={product.name}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="object-cover"
				/>
			</div>
			<h2 className="text-lg font-semibold mb-2">{product.name}</h2>
			<p className="text-gray-500">{formatPrice(product.price)}</p>
			<p className="text-gray-600">{product.description}</p>
		</div>
	)
}
