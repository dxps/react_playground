import { Breadcrumbs } from '@/components/breadcrumbs'
import { prisma } from '@/lib/prisma'
import { sleep } from '@/lib/utils'
import { Product } from '../generated/prisma'
import { ProductCard } from '../ProductCard'
import { Suspense } from 'react'
import ProductsSkeleton from '../ProductsSkeleton'

type SearchPageProps = {
	searchParams: Promise<{ query?: string }>
}

async function SearchResult({ query }: { query: string }) {
	const products = await prisma.product.findMany({
		where: {
			OR: [
				{ name: { contains: query, mode: 'insensitive' } },
				{ description: { contains: query, mode: 'insensitive' } },
			],
		},
		take: 18,
	})

	// Simulating a delay, just to see the loading state,
	// visually reflected in the page with the skeleton.
	await sleep(1000)

	if (products.length === 0) {
		return (
			<div className="text-center text-muted-foreground">
				No products found.
			</div>
		)
	}

	return (
		<>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{products.map((product: Product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</>
	)
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const params = await searchParams
	const query = params.query?.trim() ?? ''

	const breadcrumbs = [
		{ label: 'Products', href: '/' },
		{
			label: `Results for "${query}"`,
			href: `/search?query=${encodeURIComponent(query)}`,
		},
	]

	return (
		<main className="container mx-auto py-4">
			<Breadcrumbs items={breadcrumbs} />
			<Suspense key={query} fallback={<ProductsSkeleton pageSize={3} />}>
				<SearchResult query={query} />
			</Suspense>
		</main>
	)
}
