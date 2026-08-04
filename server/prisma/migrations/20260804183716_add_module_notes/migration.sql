-- CreateTable
CREATE TABLE "module_note" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "moduleIndex" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "module_note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "module_note_userId_moduleIndex_key" ON "module_note"("userId", "moduleIndex");

-- AddForeignKey
ALTER TABLE "module_note" ADD CONSTRAINT "module_note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
