import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getProductBySlug } from '@/lib/actions'
import { formatPrice /* sleep */ } from '@/lib/utils'
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

	// If you want to simulate a delay and have a bigger chance
	// to see the loading state, visually reflected in the page with the skeleton.
	// await sleep(2000)

	return (
		<main className="container mx-auto p-4">
			<Card className="max-w-3xl mx-auto">
				<CardContent className="px-6 py-0">
					<h1 className="text-3xl font-bold mb-2">{product.name}</h1>
					<div className="flex items-center gap-2 mb-4">
						<span className="font-semibold text-lg">
							{formatPrice(product.price)}
						</span>
						<Badge variant="secondary">
							{product.category?.name}
						</Badge>
					</div>
					<Separator className="my-4" />
					<div className="space-y-2">
						<h2 className="font-medium">Description</h2>
						<p>{product.description}</p>
					</div>
				</CardContent>
			</Card>
		</main>
	)
}
