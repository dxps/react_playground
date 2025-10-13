import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Next.js 15 Ecommerce',
	description: 'An ecommerce fullstack project built with Next.js 15',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<>
						<header>
							<Navbar />
						</header>
					</>
				</ThemeProvider>
				{children}
				<footer className="py-4">
					<div className="container mx-auto text-xs text-muted-foreground text-center">
						&copy; {new Date().getFullYear()} Next.js 15 E-Commerce
					</div>
				</footer>
			</body>
		</html>
	)
}
