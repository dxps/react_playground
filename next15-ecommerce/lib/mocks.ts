export type Product = {
	id: string
	name: string
	description: string
	price: number
	image: string
	category: string
}

export const mockProducts: Product[] = [
	{
		id: '1',
		name: 'Wireless Headphones',
		description:
			'Premium noise-cancelling wireless headphones with long battery life.',
		price: 199.99,
		image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
		category: 'Electronics',
	},
	{
		id: '2',
		name: 'Smart Watch',
		description:
			'Fitness tracker with heart reate monitoring and sleep analysis',
		price: 149.99,
		image: 'https://images.unsplash.com/photo-1617043983671-adaadcaa2460',
		category: 'Electronics',
	},
	{
		id: '3',
		name: 'Gaming Console',
		description:
			'Next-generation gaming console with advanced graphics and high-performance hardware.',
		price: 499.99,
		image: 'https://images.unsplash.com/photo-1580234797602-22c37b2a6230',
		category: 'Electronics',
	},
	{
		id: '4',
		name: 'Smart Home Hub',
		description:
			'Smart home hub with voice control, home automation, and security features.',
		price: 349.99,
		image: 'https://plus.unsplash.com/premium_photo-1728681168863-2c62a62fbfda',
		category: 'Electronics',
	},
	{
		id: '5',
		name: 'Wireless Earbuds',
		description:
			'Wireless earbuds with noise-cancelling technology and long battery life.',
		price: 99.99,
		image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb',
		category: 'Electronics',
	},
]
