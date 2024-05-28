-- CreateTable
CREATE TABLE "Product" (
    "created_at" INTEGER NOT NULL,
    "description" TEXT[],
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "product_group" TEXT NOT NULL,
    "purchase_count" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
