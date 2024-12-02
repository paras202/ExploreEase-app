'use server'

import { db } from '@/lib/db'
import { PaymentMethod, IdProofType } from '@prisma/client'

export async function createBooking(formData: FormData) {
  try {
    // Extract data from formData
    const userId = formData.get('userId') as string
    const userName = formData.get('userName') as string
    const email = formData.get('userEmail') as string
    const placeName = formData.get('placeName') as string
    const placeLocation = formData.get('placeLocation') as string
    const latitude = parseFloat(formData.get('latitude') as string)
    const longitude = parseFloat(formData.get('longitude') as string)
    const numberOfTickets = parseInt(formData.get('numberOfTickets') as string)
    const pricePerTicket = parseFloat(formData.get('pricePerTicket') as string)
    const totalAmount = parseFloat(formData.get('totalAmount') as string)
    const idProofType = formData.get('idProofType') as IdProofType
    const idProofNumber = formData.get('idProofNumber') as string
    const paymentMethod = (formData.get('paymentMethod') || 'PENDING') as PaymentMethod

    // Generate unique booking reference
    const bookingReference = `BK-${Math.random().toString(36).substring(2, 9).toUpperCase()}`

    // Perform mock payment validation
    const paymentValidation = await mockPaymentProcessing(totalAmount, paymentMethod)

    // If payment fails, throw an error
    if (!paymentValidation.success) {
      throw new Error(paymentValidation.message)
    }

    // Create booking in database
    const booking = await db.ticketBooking.create({
      data: {
        UserId: userId,
        userName,
        email,
        placeName,
        placeLocation,
        latitude,
        longitude,
        numberOfTickets,
        pricePerTicket,
        totalAmount,
        idProofType,
        idProofNumber,
        bookingReference,
        paymentMethod: paymentValidation.success ? paymentMethod : PaymentMethod.PENDING
      }
    })

    // Construct redirect URL with booking details
    const redirectUrl = `/booking-confirmation?` + 
      `bookingId=${booking.id}` +
      `&bookingReference=${bookingReference}` +
      `&userName=${encodeURIComponent(userName)}` +
      `&placeName=${encodeURIComponent(placeName)}` +
      `&placeLocation=${encodeURIComponent(placeLocation)}` +
      `&tickets=${numberOfTickets}` +
      `&totalAmount=${totalAmount}`

    return { 
      success: true, 
      bookingId: booking.id,
      bookingReference,
      redirectUrl
    }
  } catch (error) {
    console.error('Booking creation error:', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Booking failed' 
    }
  }
}

// Mock Payment Processing Function
async function mockPaymentProcessing(
  amount: number, 
  paymentMethod: PaymentMethod
): Promise<{ success: boolean, message: string }> {
  // Simulate payment processing time
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Mock payment validation logic
  switch(paymentMethod) {
    case 'UPI':
      // 80% success rate for UPI
      return Math.random() < 0.8 
        ? { success: true, message: 'UPI Payment Successful' }
        : { success: false, message: 'UPI Payment Failed' }
    
    case 'CREDIT_CARD':
      // 90% success rate for Credit Card
      return Math.random() < 0.9
        ? { success: true, message: 'Credit Card Payment Successful' }
        : { success: false, message: 'Credit Card Payment Declined' }
    
    case 'DEBIT_CARD':
      // 85% success rate for Debit Card
      return Math.random() < 0.85
        ? { success: true, message: 'Debit Card Payment Successful' }
        : { success: false, message: 'Debit Card Payment Failed' }
    
    case 'NET_BANKING':
      // 75% success rate for Net Banking
      return Math.random() < 0.75
        ? { success: true, message: 'Net Banking Payment Successful' }
        : { success: false, message: 'Net Banking Payment Failed' }
    
    case 'WALLET':
      // 95% success rate for Wallet
      return Math.random() < 0.95
        ? { success: true, message: 'Wallet Payment Successful' }
        : { success: false, message: 'Wallet Payment Failed' }
    
    default:
      return { 
        success: false, 
        message: 'Invalid Payment Method' 
      }
  }
}