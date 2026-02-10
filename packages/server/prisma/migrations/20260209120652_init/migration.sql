-- AlterTable
ALTER TABLE "blogs" ADD COLUMN     "Author" TEXT,
ADD COLUMN     "excerpt" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "isArchived" BOOLEAN,
ADD COLUMN     "isDeleted" BOOLEAN,
ADD COLUMN     "isFeatured" BOOLEAN,
ADD COLUMN     "isPopular" BOOLEAN,
ADD COLUMN     "isPublished" BOOLEAN,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "timetoRead" INTEGER;

-- CreateTable
CREATE TABLE "games" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "image" TEXT,
    "cardImageUrl" TEXT,
    "bannerImageUrl" TEXT,
    "heroVideoUrls" TEXT[],
    "detailImageUrls" TEXT[],
    "displayOrder" INTEGER,
    "genre" TEXT,
    "platform" TEXT,
    "studio" TEXT,
    "rating" DOUBLE PRECISION,
    "releaseDate" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    "isPopular" BOOLEAN,
    "isFeatured" BOOLEAN,
    "isArchived" BOOLEAN,
    "isDeleted" BOOLEAN,
    "isPublished" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);
