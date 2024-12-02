-- CreateEnum
CREATE TYPE "IdProofType" AS ENUM ('DRIVING_LICENSE', 'AADHAR_CARD', 'PAN_CARD', 'PASSPORT', 'VOTER_ID');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'UPI', 'NET_BANKING', 'WALLET');

-- CreateTable
CREATE TABLE "TicketBooking" (
    "id" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "idProofType" "IdProofType" NOT NULL,
    "idProofNumber" TEXT NOT NULL,
    "placeName" TEXT NOT NULL,
    "placeLocation" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numberOfTickets" INTEGER NOT NULL,
    "pricePerTicket" DOUBLE PRECISION NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TicketBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TicketBooking_UserId_idx" ON "TicketBooking"("UserId");

-- CreateIndex
CREATE INDEX "TicketBooking_email_idx" ON "TicketBooking"("email");
