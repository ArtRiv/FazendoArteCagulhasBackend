/*
  Warnings:

  - The values [COMPLETED,FAILED] on the enum `ShippingLabelStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [COMPLETED,CANCELED] on the enum `TransactionStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receipt` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ShippingLabelStatus_new" AS ENUM ('PENDING', 'RELEASED', 'POSTED', 'DELIVERED', 'CANCELED');
ALTER TABLE "ShippingLabel" ALTER COLUMN "status" TYPE "ShippingLabelStatus_new" USING ("status"::text::"ShippingLabelStatus_new");
ALTER TYPE "ShippingLabelStatus" RENAME TO "ShippingLabelStatus_old";
ALTER TYPE "ShippingLabelStatus_new" RENAME TO "ShippingLabelStatus";
DROP TYPE "ShippingLabelStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TransactionStatus_new" AS ENUM ('SUCCEEDED', 'PENDING', 'FAILED');
ALTER TABLE "Transaction" ALTER COLUMN "status" TYPE "TransactionStatus_new" USING ("status"::text::"TransactionStatus_new");
ALTER TYPE "TransactionStatus" RENAME TO "TransactionStatus_old";
ALTER TYPE "TransactionStatus_new" RENAME TO "TransactionStatus";
DROP TYPE "TransactionStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "receipt" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Address_email_key" ON "Address"("email");
