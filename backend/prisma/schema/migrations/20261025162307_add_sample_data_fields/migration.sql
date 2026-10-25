-- AlterTable
ALTER TABLE "books" ADD COLUMN     "available_on" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "book_code" TEXT NOT NULL,
ADD COLUMN     "last_payout_at" TIMESTAMP(3),
ADD COLUMN     "print_partner" TEXT,
ADD COLUMN     "royalty_per_copy" DECIMAL(10,2),
ALTER COLUMN "mrp" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "author_code" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "joined_at" TIMESTAMP(3),
ADD COLUMN     "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "books_book_code_key" ON "books"("book_code");

-- CreateIndex
CREATE UNIQUE INDEX "users_author_code_key" ON "users"("author_code");

