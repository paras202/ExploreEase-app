import { NextResponse } from 'next/server';
import { sendBookingConfirmationEmail } from '@/app/lib/email';

export async function POST(request: Request) {
  try {
    const bookingDetails = await request.json();
    
    const emailSent = await sendBookingConfirmationEmail(bookingDetails);
    
    return NextResponse.json({
      success: emailSent,
      message: emailSent ? 'Email sent successfully' : 'Failed to send email'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error processing booking confirmation email'
    }, { status: 500 });
  }
}