-- CreateTable
CREATE TABLE "Paste" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "maxViews" INTEGER,
    "remainingViews" INTEGER,

    CONSTRAINT "Paste_pkey" PRIMARY KEY ("id")
);
