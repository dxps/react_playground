import { Skeleton } from './ui/skeleton'

export function BreadcrumbsSkeleton() {
	return (
		<div className="mb-7 flex items-center gap-2">
			<Skeleton className="h-4 w-4 rounded-full" />
			<Skeleton className="h-4 w-[80px] rounded-full" />
			<Skeleton className="h-4 w-[120px] rounded-full" />
		</div>
	)
}
