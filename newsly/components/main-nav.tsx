import * as React from 'react'
import Link from 'next/link'
import { NavItem } from '@/types/nav'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { siteConfig } from '@/config/site'

interface MainNavProps {
	items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
	return (
		<div className="flex p-4 gap-6 md:gap-10">
			<Link href="/" className="flex items-center space-x-2">
				<Icons.logo className="h-6 w-6" />
				<span className="font-bold hidden sm:inline-block">
					{siteConfig.name}
				</span>
			</Link>
			{items?.length ? (
				<nav className="gap-6 hidden md:block">
					{items?.map(
						(item, index) =>
							item.href && (
								<Link
									key={index}
									href={item.href}
									className={cn(
										'flex items-center text-sm font-medium text-muted-foreground',
										item.disabled &&
											'cursor-not-allowed opacity-80'
									)}
								>
									{item.title}
								</Link>
							)
					)}
				</nav>
			) : null}
		</div>
	)
}
