-- CreateEnum
CREATE TYPE "LearningPath" AS ENUM ('GUIDED', 'COURSEWORK');

-- CreateEnum
CREATE TYPE "CheckpointKey" AS ENUM ('PLAN_OR_BLUEPRINT_APPROVAL', 'ARCHITECTURE_OR_FILE_MAP', 'FINAL_COMPLETION_REVIEW');

-- CreateEnum
CREATE TYPE "BadgeKey" AS ENUM ('GETTING_STARTED', 'LEARNING_PATH_CHOSEN', 'FIRST_CHECKPOINT', 'STREAK_STARTER');

-- CreateEnum
CREATE TYPE "ActivityEventType" AS ENUM ('ACCOUNT_CREATED', 'LEARNING_PATH_CHOSEN', 'CHECKPOINT_PASSED');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "currentStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastActivityOn" TIMESTAMP(3),
ADD COLUMN     "learningPath" "LearningPath";

-- CreateTable
CREATE TABLE "activity_event" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "ActivityEventType" NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkpoint_completion" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "checkpoint" "CheckpointKey" NOT NULL,
    "passedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "checkpoint_completion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_badge" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "badge" "BadgeKey" NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_badge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "activity_event_userId_createdAt_idx" ON "activity_event"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "checkpoint_completion_userId_checkpoint_key" ON "checkpoint_completion"("userId", "checkpoint");

-- CreateIndex
CREATE UNIQUE INDEX "user_badge_userId_badge_key" ON "user_badge"("userId", "badge");

-- AddForeignKey
ALTER TABLE "activity_event" ADD CONSTRAINT "activity_event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkpoint_completion" ADD CONSTRAINT "checkpoint_completion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_badge" ADD CONSTRAINT "user_badge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
