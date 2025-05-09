import { Resend } from 'resend';

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingConfirmationEmail(bookingDetails: {
  email: string;
  userName: string;
  placeName: string;
  bookingDate: string;
  bookingReference: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Explore Ease <exploreease39@gmail.com>', // Replace with your verified domain
      to: [bookingDetails.email],
      subject: 'Booking Confirmation - Explore Ease',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #6a4ffc; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Explore Ease</h1>
            <p style="margin: 5px 0;">Your Booking Confirmation</p>
          </div>
          <div style="padding: 20px; background-color: #f4f4f4;">
            <h2 style="color: #333;">Dear ${bookingDetails.userName},</h2>
            <p style="color: #666;">Your booking for <strong>${bookingDetails.placeName}</strong> is confirmed!</p>
            <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Booking Details:</strong></p>
              <p>Date: ${bookingDetails.bookingDate}</p>
              <p>Booking Reference: <span style="color: #6a4ffc;">${bookingDetails.bookingReference}</span></p>
            </div>
            <p style="color: #666;">Thank you for choosing Explore Ease. We hope you have an amazing experience!</p>
            <div style="text-align: center; margin-top: 20px;">
              <a href="https://yourdomain.com" style="background-color: #6a4ffc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Visit Explore Ease</a>
            </div>
          </div>
          <div style="text-align: center; color: #888; padding: 10px; font-size: 12px;">
            © 2024 Explore Ease. All rights reserved.
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Email sending failed:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}