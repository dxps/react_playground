import { PrismaClient, Product } from '@/app/generated/prisma'

const prisma = new PrismaClient()

async function main() {
	await prisma.product.deleteMany()
	await prisma.category.deleteMany()

	const electronics = await prisma.category.create({
		data: {
			name: 'Electronics',
			slug: 'electronics',
		},
	})

	const clothing = await prisma.category.create({
		data: {
			name: 'Clothing',
			slug: 'clothing',
		},
	})

	const home = await prisma.category.create({
		data: {
			name: 'Home',
			slug: 'home',
		},
	})

	const products: Product[] = [
		{
			id: '1',
			name: 'Wireless Headphones',
			description:
				'Premium noise-cancelling wireless headphones with long battery life.',
			price: 199.99,
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
			categoryId: electronics.id,
			slug: 'wireless-headphones',
		},
		{
			id: '2',
			name: 'Smart Watch',
			description:
				'Fitness tracker with heart reate monitoring and sleep analysis',
			price: 149.99,
			image: 'https://images.unsplash.com/photo-1617043983671-adaadcaa2460',
			categoryId: electronics.id,
			slug: 'smart-watch',
		},
		{
			id: '3',
			name: 'Gaming Console',
			description:
				'Next-generation gaming console with advanced graphics and high-performance hardware.',
			price: 499.99,
			image: 'https://images.unsplash.com/photo-1580234797602-22c37b2a6230',
			categoryId: electronics.id,
			slug: 'gaming-console',
		},
		{
			id: '4',
			name: 'Smart Home Hub',
			description:
				'Smart home hub with voice control, home automation, and security features.',
			price: 349.99,
			image: 'https://plus.unsplash.com/premium_photo-1728681168863-2c62a62fbfda',
			categoryId: electronics.id,
			slug: 'smart-home-hub',
		},
		{
			id: '5',
			name: 'Wireless Earbuds',
			description:
				'Wireless earbuds with noise-cancelling technology and long battery life.',
			price: 99.99,
			image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb',
			categoryId: electronics.id,
			slug: 'wireless-earbuds',
		},
		{
			id: '6',
			name: 'T-Shirt',
			description: 'Comfortable and stylish t-shirt for everyday wear.',
			price: 19.99,
			image: 'https://images.unsplash.com/photo-1696086152513-c74dc1d4b135',
			categoryId: clothing.id,
			slug: 't-shirt',
		},
		{
			id: '7',
			name: 'Ceramic Mug',
			description: 'Handcrafted ceramic mug with minimalist design.',
			price: 24.99,
			image: 'https://images.unsplash.com/photo-1555763349-8eecb62a02b3',
			categoryId: home.id,
			slug: 'ceramic-mug',
		},
	]

	for (const product of products) {
		await prisma.product.create({
			data: product,
		})
	}
}

main()
	.then(async () => {
		console.log('Seeding completed.')
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
