'use client'

import { Banknote, BikeIcon, CpuIcon, FlaskConical, TvIcon } from 'lucide-react'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Separator } from './ui/separator'

const categories = [
	{
		label: 'Business',
		icon: Banknote,
	},
	{
		label: 'Entertainment',
		icon: TvIcon,
	},
	{
		label: 'Sports',
		icon: BikeIcon,
	},
	{
		label: 'Science',
		icon: FlaskConical,
	},
	{
		label: 'Technology',
		icon: CpuIcon,
	},
]

export const Categories = () => {
	return (
		<NavigationMenu className="max-w-[95vw] flex items-start justify-start">
			<NavigationMenuList>
				{categories.map((category, index) => (
					<NavigationMenuItem key={category.label}>
						<NavigationMenuItem>
							<Link href={`/category/${category.label}`} passHref>
								<NavigationMenuLink
									className={cn(
										navigationMenuTriggerStyle(),
										'px-2 transition-all hover:bg-transparent hover:text-orange-500'
									)}
								>
									<div className="flex items-center justify-between gap-2 capitalize">
										{<category.icon className="size-4" />}
										<span className="text-sm">
											{category.label}
										</span>
										{index < categories.length - 1 && (
											<Separator
												orientation="vertical"
												className="ml-4 h-8 rotate-45 bg-orange-300"
											/>
										)}
									</div>
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	)
}
