-- CreateTable
CREATE TABLE "superheroes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "superpower" TEXT NOT NULL,
    "humilityScore" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "superheroes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "superheroes_name_key" ON "superheroes"("name");
