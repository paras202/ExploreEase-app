/*
  Warnings:

  - Added the required column `bookingReference` to the `TicketBooking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TicketBooking" ADD COLUMN     "bookingReference" TEXT NOT NULL;
