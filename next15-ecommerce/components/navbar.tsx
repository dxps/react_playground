import Link from 'next/link'
import { Button } from './ui/button'
import { Search, ShoppingCart } from 'lucide-react'
import { ModeToggle } from './mode-toggle'
import MobileNav from './mobile-nav'

export const categories = [
	{ id: 1, name: 'Electronics', href: '/categories/electronics' },
	{ id: 2, name: 'Clothing', href: '/categories/clothing' },
	{ id: 3, name: 'Home', href: '/categories/home' },
]

export function Navbar() {
	return (
		<div className="border-b">
			<div className="container mx-auto flex h-16 items-center justify-between">
				<div>
					<div className="flex items-center gap-6">
						<Link
							className="text-lg font-bold hidden md:block"
							href="/"
						>
							Store
						</Link>
						<nav className="hidden md:flex items-center gap-6">
							{categories.map((category) => (
								<Link
									key={category.id}
									href={category.href}
									className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
								>
									{category.name}
								</Link>
							))}
						</nav>
						{/* Mobile Nav */}
						<MobileNav />
					</div>
				</div>
				<div className="flex items-center">
					<Button variant="ghost" size="icon" asChild>
						<Link href="/search">
							<Search />
						</Link>
					</Button>
					<Button variant="ghost" size="icon" asChild>
						<Link href="/cart">
							<ShoppingCart />
						</Link>
					</Button>
					<ModeToggle />
				</div>
			</div>
		</div>
	)
}
