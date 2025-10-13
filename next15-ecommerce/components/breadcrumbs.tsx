import { Home } from 'lucide-react'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from './ui/breadcrumb'

interface BreadcrumbsProps {
	items: { label: string; href: string; active?: boolean }[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
	return (
		<Breadcrumb className="flex items-center mb-4 h-8 gap-2">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">
						<Home className="h-4 w-4" />
					</BreadcrumbLink>
				</BreadcrumbItem>

				{items.map((item, index) => (
					<div key={index} className="flex items-center">
						<BreadcrumbSeparator className="pr-1.5" />
						<BreadcrumbItem>
							<BreadcrumbLink
								href={item.href}
								className={item.active ? 'active' : ''}
								aria-current={item.active ? 'page' : undefined}
							>
								{item.label}
							</BreadcrumbLink>
						</BreadcrumbItem>
					</div>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
