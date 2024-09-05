/*
  Warnings:

  - The values [PENDING,RELEASED,POSTED,DELIVERED,CANCELED] on the enum `ShippingLabelStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ShippingLabelStatus_new" AS ENUM ('pending', 'released', 'posted', 'delivered', 'canceled');
ALTER TABLE "ShippingLabel" ALTER COLUMN "status" TYPE "ShippingLabelStatus_new" USING ("status"::text::"ShippingLabelStatus_new");
ALTER TYPE "ShippingLabelStatus" RENAME TO "ShippingLabelStatus_old";
ALTER TYPE "ShippingLabelStatus_new" RENAME TO "ShippingLabelStatus";
DROP TYPE "ShippingLabelStatus_old";
COMMIT;
