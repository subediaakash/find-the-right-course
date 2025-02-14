/*
  Warnings:

  - You are about to drop the column `description` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Wishlist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "History" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Wishlist" DROP COLUMN "description";
