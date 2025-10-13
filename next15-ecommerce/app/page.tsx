import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { Product } from './generated/prisma'
import { ProductCard } from './ProductCard'
import { prisma } from '@/lib/prisma'
import { Suspense } from 'react'
import ProductsSkeleton from './ProductsSkeleton'
import { Breadcrumbs } from '@/components/breadcrumbs'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const pageSize = 3

async function Products({ page }: { page: number }) {
	const skip = (page - 1) * pageSize

	const products = await prisma.product.findMany({
		skip,
		take: pageSize,
		orderBy: { name: 'asc' },
	})

	// Simulating a delay (just to showcase the loading state that shows the skeleton effect).
	// await new Promise((resolve) => setTimeout(resolve, 500))

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

export default async function HomePage(props: { searchParams: SearchParams }) {
	const searchParams = await props.searchParams
	const page = Number(searchParams.page || 1)

	const totalProducts = await prisma.product.count()
	const totalPages = Math.ceil(totalProducts / pageSize)

	return (
		<main className="container mx-auto py-4">
			<Breadcrumbs items={[{ label: 'Products', href: '/' }]} />

			<Suspense
				key={page}
				fallback={<ProductsSkeleton pageSize={pageSize} />}
			>
				<Products page={page} />
			</Suspense>

			<Pagination className="mt-8">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href={`?page=${page - 1}`}
							aria-disabled={page <= 1}
							tabIndex={page <= 1 ? -1 : undefined}
							className={
								page <= 1
									? 'pointer-events-none opacity-50'
									: undefined
							}
						/>
					</PaginationItem>

					{Array.from({ length: totalPages }, (_, index) => (
						<PaginationItem key={index}>
							<PaginationLink
								href={`?page=${index + 1}`}
								isActive={index + 1 === page}
							>
								{index + 1}
							</PaginationLink>
						</PaginationItem>
					))}

					<PaginationItem>
						<PaginationNext
							href={`?page=${page + 1}`}
							aria-disabled={page >= totalPages}
							tabIndex={page >= totalPages ? -1 : undefined}
							className={
								page >= totalPages
									? 'pointer-events-none opacity-50'
									: undefined
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</main>
	)
}
