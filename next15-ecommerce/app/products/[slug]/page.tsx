import { Breadcrumbs } from '@/components/breadcrumbs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getProductBySlug } from '@/lib/actions'
import { formatPrice, sleep } from '@/lib/utils'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export async function generateMetadata({
	params,
}: {
	params: { slug: string }
}) {
	const product = await getProductBySlug(params.slug)

	if (!product) {
		return {}
	}

	return {
		title: product.name,
		description: product.description,
		openGraph: {
			title: product.name,
			description: product.description,
			images: [
				{
					url: product.image,
				},
			],
		},
	}
}

export default async function ProductPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const product = await getProductBySlug(slug)

	if (!product) {
		notFound()
	}

	const breadcrumbs = [
		{ label: 'Products', href: '/' },
		{
			label: product.category?.name,
			href: `/categories/${product.category?.slug}`,
		},
		{
			label: product.name,
			href: `/products/${product.slug}`,
			active: true,
		},
	]

	// Simulating a delay, just to see the loading state,
	// visually reflected in the page with the skeleton.
	await sleep(2000)

	return (
		<main className="container mx-auto py-4">
			<Breadcrumbs items={breadcrumbs} />
			<Card>
				<CardContent className="px-0 md:p-6 md:pl-0 grid grid-cols-1 md:grid-cols-2 gap-4 ">
					<div className="relative aspect-video md:aspect-square">
						{product.image && (
							<Image
								src={product.image}
								alt={product.name}
								fill
								priority
								// For screens up to "md", use 100% width (aka full viewport wide).
								// For screens larger than "md", use 50% width.
								sizes="(max-width: 768px) 100vw, 50vw"
								className="object-cover"
							/>
						)}
					</div>
					<div className="p-6 md:px-4 md:py-6">
						<h1 className="text-3xl font-bold mb-2">
							{product.name}
						</h1>
						<div className="flex items-center gap-2 mb-4">
							<span className="font-semibold text-lg">
								{formatPrice(product.price)}
							</span>
							<Badge variant="secondary">
								{product.category?.name}
							</Badge>
						</div>

						<Separator className="mb-4" />

						<div className="space-y-2">
							<h2 className="font-medium">Description</h2>
							<p>{product.description}</p>
						</div>

						<Separator className="mb-4" />

						<div className="space-y-2">
							<h2 className="font-medium">Availability</h2>
							<div className="flex items-center gap-2">
								{product.inventory > 0 ? (
									<>
										<Badge
											variant="outline"
											className="text-green-600 font-semibold"
										>
											In stock
										</Badge>
										<span className="text-xs text-gray-500">
											({product.inventory} items
											available)
										</span>
									</>
								) : (
									<Badge
										variant="outline"
										className="text-red-600 font-semibold"
									>
										Out of stock
									</Badge>
								)}
							</div>
						</div>

						<Separator className="my-4" />

						<div>
							<div className="relative">
								<Button
									disabled={product.inventory === 0}
									size="sm"
									className="w-full cursor-pointer"
								>
									<ShoppingCart className="mr-2 w-4 h-4" />
									{product.inventory > 0
										? 'Add to cart'
										: 'Out of stock'}
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</main>
	)
}
