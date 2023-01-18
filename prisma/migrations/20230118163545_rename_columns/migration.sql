/*
  Warnings:

  - You are about to drop the column `createdAt` on the `habits` table. All the data in the column will be lost.
  - You are about to drop the column `habitId` on the `habit_week_days` table. All the data in the column will be lost.
  - You are about to drop the column `weekDay` on the `habit_week_days` table. All the data in the column will be lost.
  - You are about to drop the column `dayId` on the `day_habits` table. All the data in the column will be lost.
  - You are about to drop the column `habitId` on the `day_habits` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `habits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `habit_id` to the `habit_week_days` table without a default value. This is not possible if the table is not empty.
  - Added the required column `week_day` to the `habit_week_days` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day_id` to the `day_habits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `habit_id` to the `day_habits` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_habits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);
INSERT INTO "new_habits" ("id", "title") SELECT "id", "title" FROM "habits";
DROP TABLE "habits";
ALTER TABLE "new_habits" RENAME TO "habits";
CREATE TABLE "new_habit_week_days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL
);
INSERT INTO "new_habit_week_days" ("id") SELECT "id" FROM "habit_week_days";
DROP TABLE "habit_week_days";
ALTER TABLE "new_habit_week_days" RENAME TO "habit_week_days";
CREATE UNIQUE INDEX "habit_week_days_habit_id_week_day_key" ON "habit_week_days"("habit_id", "week_day");
CREATE TABLE "new_day_habits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day_id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL
);
INSERT INTO "new_day_habits" ("id") SELECT "id" FROM "day_habits";
DROP TABLE "day_habits";
ALTER TABLE "new_day_habits" RENAME TO "day_habits";
CREATE UNIQUE INDEX "day_habits_day_id_habit_id_key" ON "day_habits"("day_id", "habit_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
