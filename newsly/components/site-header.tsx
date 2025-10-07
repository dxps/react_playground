'use client'

import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { buttonVariants } from '@/components/ui/button'
import { MainNav } from '@/components/main-nav'
import { ThemeToggle } from '@/components/theme-toggle'
import { Icons } from '@/components/icons'
import { Categories } from '@/components/category'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export function SiteHeader() {
	return (
		<header className="flex flex-col w-full bg-background sticky top-0 z-40 md:flex-row md:border-b">
			<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
				<MainNav items={siteConfig.mainNav} />
				<div className="flex flex-1 items-center justify-end space-x-4">
					<ScrollArea className="whitespace-nowrap">
						<Categories />
						<ScrollBar
							orientation="horizontal"
							className="md:hidden"
						/>
					</ScrollArea>
					<nav className="flex items-center space-x-1">
						<Link
							href={siteConfig.links.github}
							target="_blank"
							rel="noreferrer"
						>
							<div
								className={buttonVariants({
									size: 'icon',
									variant: 'ghost',
								})}
							>
								<Icons.gitHub className="h-5 w-5" />
								<span className="sr-only">GitHub</span>
							</div>
						</Link>
						<Link
							href={siteConfig.links.twitter}
							target="_blank"
							rel="noreferrer"
						>
							<div
								className={buttonVariants({
									size: 'icon',
									variant: 'ghost',
								})}
							>
								<Icons.twitter className="h-5 w-5 fill-current" />
								<span className="sr-only">Twitter</span>
							</div>
						</Link>
						<ThemeToggle />
					</nav>
				</div>
			</div>
		</header>
	)
}
