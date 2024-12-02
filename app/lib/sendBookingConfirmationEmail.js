// pages/api/sendBookingConfirmationEmail.js
import Mandrill from 'mandrill-api/mandrill';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, userName, placeName, placeLocation, bookingReference, qrCode } = req.body;

    // Replace with your Mailchimp Mandrill API Key
    const mandrill = new Mandrill.Mandrill('ddc51816cd484ac1aad3ae3b9095044d-us3'); 

    const message = {
      from_email: 'gurwindersinghvlogs@gmail.com',
      from_name: 'Explore Ease',
      to: [
        {
          email: 'khushbrar605@gmail.com',
          name: 'Khushpreet Singh',
          type: 'to',
        },
      ],
      subject: 'Booking Confirmation',
      html: `
        <h1>Booking Confirmed</h1>
        <p>Thank you for booking at ${placeName} in ${placeLocation}.</p>
        <p>Your booking reference is: <strong>${bookingReference}</strong></p>
        <img src="${qrCode}" alt="QR Code" />
        <p>We look forward to seeing you!</p>
      `,
    };

    try {
      const result = await new Promise((resolve, reject) => {
        mandrill.messages.send({ message }, function(response) {
          resolve(response);
        }, function(error) {
          reject(error);
        });
      });

      res.status(200).json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
