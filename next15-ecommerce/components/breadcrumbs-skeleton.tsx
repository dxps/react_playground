import { Skeleton } from './ui/skeleton'

export function BreadcrumbsSkeleton() {
	return (
		<div className="flex items-center mb-4 h-8 gap-2">
			<Skeleton className="h-4 w-4 rounded-full" />
			<Skeleton className="h-4 w-[80px] rounded-full" />
			<Skeleton className="h-4 w-[120px] rounded-full" />
		</div>
	)
}
