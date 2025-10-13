# Next.js 15 Ecommerce

This is a fullstack TypeScript project using Next.js 15.

<br/>

## Setup

-   Run `npm install` to install the dependencies.
-   Run `docker-compose up -d` to start the PostgreSQL server container that hosts the database.
-   Run `npx prisma generate` to generate the Prisma client, or update the generated Prisma client in case of schema (see [`schema.prisma`](./prisma/schema.prisma) file) updates.
-   Run `npx prisma migrate deploy` to deploy the migrations to (aka create the objects in) the database.
-   Run `npm run seed` to populate the database with initial data (categories and products).
-   Run `npm run dev` to start the development server (or use `./dev.sh` provided script).

<br/>

## Project creation notes

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
