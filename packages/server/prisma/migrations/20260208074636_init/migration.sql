-- CreateTable
CREATE TABLE "blogs" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);
