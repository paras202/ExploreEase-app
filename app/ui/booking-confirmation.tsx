'use client';
import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import jsPDF from 'jspdf';
import QRCode from 'qrcode'
import Image from 'next/image'
import { Button } from 'flowbite-react'
import { toast } from 'sonner'
import { MapPin, Calendar, Ticket, DollarSign } from 'lucide-react'
import { Client } from '@clerk/nextjs/server'

interface BookingDetails {
  bookingId: string
  userName: string
  email: string
  placeName: string
  placeLocation: string
  bookingDate: string
  numberOfTickets: number
  totalAmount: number
  bookingReference: string
}
export default function BookingConfirmation() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const mockBookingDetails: BookingDetails = {
          bookingId: searchParams.get('bookingId') || '',
          userName: searchParams.get('userName') || '',
          email: searchParams.get('email') || '',
          placeName: searchParams.get('placeName') || '',
          placeLocation: searchParams.get('placeLocation') || '',
          bookingDate: searchParams.get('bookingDate') || new Date().toLocaleDateString(),
          numberOfTickets: parseInt(searchParams.get('tickets') || '1'),
          totalAmount: parseFloat(searchParams.get('totalAmount') || '0'),
          bookingReference: searchParams.get('bookingReference') || ''
        }
        setBookingDetails(mockBookingDetails)
        const qrCodeData = JSON.stringify(mockBookingDetails)
        const qrCode = await QRCode.toDataURL(qrCodeData)
        setQrCodeUrl(qrCode)
        if (mockBookingDetails.email) {
          const emailSent = await sendBookingConfirmationEmail(mockBookingDetails)
          if (emailSent) {
            toast.success('Booking Confirmation Email Sent')
          } else {
            toast.error('Failed to Send Confirmation Email')
          }
        }
        toast.success('Booking Confirmed', {
          description: `Ticket booked for ${mockBookingDetails.placeName}`
        })
      } catch (error) {
        toast.error('Error Loading Booking Details')
      }
    }
    fetchBookingDetails()
  }, [searchParams])
const sendBookingConfirmationEmail = async (bookingDetails: BookingDetails) => {
  try {
    const response = await fetch('/api/sendBookingConfirmation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: bookingDetails.email,
        userName: bookingDetails.userName,
        placeName: bookingDetails.placeName,
        bookingDate: bookingDetails.bookingDate,
        bookingReference: bookingDetails.bookingReference,
      }),
    });
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
  const generatePDF = async () => {
    if (!bookingDetails) return
    try {
      const doc = new jsPDF()
      
      // Add header with logo
      doc.setFontSize(24)
      doc.setTextColor(75, 85, 99)
      doc.text('Explore Ease', 105, 20, { align: 'center' })
      
      // Add ticket details
      doc.setFontSize(16)
      doc.setTextColor(31, 41, 55)
      doc.text('Booking Confirmation', 105, 35, { align: 'center' })
      
      doc.setFontSize(12)
      doc.text(`Reference: ${bookingDetails.bookingReference}`, 20, 50)
      doc.text(`Name: ${bookingDetails.userName}`, 20, 60)
      doc.text(`Destination: ${bookingDetails.placeName}`, 20, 70)
      doc.text(`Location: ${bookingDetails.placeLocation}`, 20, 80)
      doc.text(`Number of Tickets: ${bookingDetails.numberOfTickets}`, 20, 90)
      doc.text(`Total Amount: $${bookingDetails.totalAmount}`, 20, 100)
      doc.text(`Booking Date: ${bookingDetails.bookingDate}`, 20, 110)
      // Add QR Code
      if (qrCodeUrl) {
        doc.addImage(qrCodeUrl, 'PNG', 70, 120, 70, 70)
      }
      // Add footer
      doc.setFontSize(10)
      doc.setTextColor(156, 163, 175)
      doc.text('© Explore Ease - Your Journey Begins Here', 105, 280, { align: 'center' })
      doc.save(`ExploreEase-Ticket-${bookingDetails.bookingReference}.pdf`)
    } catch (error) {
      toast.error('Error Generating Ticket')
    }
  }
  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-lg text-gray-600">Loading your booking details...</div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
    
      {/* Main Content */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Success Banner */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8 text-white text-center">
              <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-purple-100">Get ready for an amazing experience</p>
            </div>
            {/* Booking Details */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Details</h2>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <MapPin className="text-indigo-600" />
                        <div>
                          <p className="font-medium">{bookingDetails.placeName}</p>
                          <p className="text-gray-600 text-sm">{bookingDetails.placeLocation}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="text-indigo-600" />
                        <div>
                          <p className="font-medium">Booking Date</p>
                          <p className="text-gray-600 text-sm">{bookingDetails.bookingDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Ticket className="text-indigo-600" />
                        <div>
                          <p className="font-medium">Number of Tickets</p>
                          <p className="text-gray-600 text-sm">{bookingDetails.numberOfTickets}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <DollarSign className="text-indigo-600" />
                        <div>
                          <p className="font-medium">Total Amount</p>
                          <p className="text-gray-600 text-sm">${bookingDetails.totalAmount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-6">
                    <p className="text-sm text-green-800 mb-1">Booking Reference</p>
                    <p className="text-2xl font-bold text-green-700">{bookingDetails.bookingReference}</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6 text-center">
                    <p className="text-gray-600 mb-4">Scan QR Code at Venue</p>
                    {qrCodeUrl && (
                      <div className="flex justify-center">
                        <Image 
                          src={qrCodeUrl} 
                          alt="Booking QR Code" 
                          width={200} 
                          height={200}
                          className="rounded-lg shadow-md"
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <Button 
                      gradientDuoTone="purpleToBlue"
                      onClick={generatePDF}
                      className="w-full py-2.5"
                    >
                      Download Ticket
                    </Button>
                    <Button 
                      gradientDuoTone="purpleToBlue"
                      outline
                      onClick={() => router.push('/')}
                      className="w-full py-2.5"
                    >
                      Back to Home
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}