/*
  Warnings:

  - The primary key for the `TransactionHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_transactionHistoryID_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "transactionHistoryID" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TransactionHistory" DROP CONSTRAINT "TransactionHistory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TransactionHistory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TransactionHistory_id_seq";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transactionHistoryID_fkey" FOREIGN KEY ("transactionHistoryID") REFERENCES "TransactionHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
