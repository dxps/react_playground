/*
  Warnings:

  - A unique constraint covering the columns `[image]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "image" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_image_key" ON "products"("image");
