import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import { Product } from './generated/prisma'
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

export function ProductCard({ product }: { product: Product }) {
	return (
		<Link href={`/products/${product.slug}`}>
			<Card className="pt-0 overflow-hidden">
				<div className="relative aspect-video">
					{product.image && (
						<Image
							src={product.image}
							alt={product.name}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							className="object-cover"
						/>
					)}
				</div>
				<CardHeader>
					<CardTitle>{product.name}</CardTitle>
					<CardDescription>{product.description}</CardDescription>
				</CardHeader>
				<CardFooter>
					<p>{formatPrice(product.price)}</p>
				</CardFooter>
			</Card>
		</Link>
	)
}
