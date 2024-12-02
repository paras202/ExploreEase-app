'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import Map from '../Map';
import Link from 'next/link';
import { Modal, Button, Label, TextInput, Select, Spinner } from 'flowbite-react';
import { createBooking } from '@/lib/actions';
import { useUser } from '@clerk/nextjs';
import { toast, Toaster } from 'sonner';
import { PaymentMethod } from '@prisma/client';

interface TouristPlace {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  address: string;
  rating: string;
  num_reviews: string;
  ranking: string;
  image: string;
  website: string;
  isBlessed?: boolean;
}

const API_URL = 'https://travel-advisor.p.rapidapi.com/attractions/get-details';
const options = (id: string) => ({
  params: { location_id: id },
  headers: {
    'x-rapidapi-key': 'b6f891c2b4msh2001f9ae26a926ep1fc7eajsn82673689b0c5',
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
  }
});

interface Props {
  id: string;
}

const TouristPlaceDetails = ({ id }: Props) => {
  const [place, setPlace] = useState<TouristPlace | null>(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [tickets, setTickets] = useState(1);
  const [ticketPrice, setTicketPrice] = useState(500);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('UPI');

  const router = useRouter();

  const { user } = useUser();

  const generateTicketPrice = (isBlessed?: boolean) => {
    if (isBlessed) {
      return 0;
    }
    // Generate random price between 500 and 5000, multiple of 5
    const prices = Array.from({ length: 91 }, (_, i) => 500 + i * 5);
    return prices[Math.floor(Math.random() * prices.length)];
  };

  useEffect(() => {
    if (id) {
      const fetchPlaceDetails = async () => {
        try {
          const { data } = await axios.get(API_URL, options(id));

          // console.log(data);
        
          const isBlessed = data.photo.is_blessed;
          
          const placeDetails: TouristPlace = {
            id: data.location_id,
            name: data.name,
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
            description: data.description || 'No description available',
            address: data.address,
            rating: data.rating || 'N/A',
            num_reviews: data.num_reviews || 'N/A',
            ranking: data.ranking || 'N/A',
            image: data.photo?.images.large.url || '',
            website: data.website || '#',
            isBlessed: isBlessed
          };

          setPlace(placeDetails);
          
          // Set ticket price based on blessed status
          setTicketPrice(generateTicketPrice(isBlessed));
          
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch tourist place details');
          setLoading(false);
        }
      };
      fetchPlaceDetails();
    }
  }, [id]);

  // Modify the handleBookingSubmit method in your existing component
const handleBookingSubmit = async (formData: FormData) => {
  // Prevent multiple submissions
  if (formLoading) return;

  setFormLoading(true);
  try {
    const totalAmount = tickets * ticketPrice;
    
    // Append payment method to formData
      formData.append('paymentMethod', selectedPaymentMethod);
      formData.append('placeName', place?.name || '');
      formData.append('placeLocation', place?.address || '');
      formData.append('latitude', place?.latitude.toString() || '');
      formData.append('longitude', place?.longitude.toString() || '');
      formData.append('totalAmount', totalAmount.toString());
      formData.append('pricePerTicket', ticketPrice.toString());
      formData.append('numberOfTickets', tickets.toString());
      formData.append('userId', `${user?.id}` || '');
      formData.append('userName', `${user?.firstName} ${user?.lastName}` || '');
      formData.append('userEmail', `${user?.primaryEmailAddress}` || '');
    
    // Rest of your existing code...
    const result = await createBooking(formData);
    
    if (result.success) {
      // Redirect to booking confirmation page
      router.push(result.redirectUrl);
    } else {
      toast.error('Booking Failed', {
        description: result.message,
      });
    }
  } catch (error) {
    toast.error('Booking Error', {
      description: 'An unexpected error occurred',
    });
  } finally {
    setFormLoading(false);
  }
};

// In your Modal's form, add a payment method selection
<div>
  <Label htmlFor="paymentMethod">Payment Method</Label>
  <Select 
   id="paymentMethod"
   value={selectedPaymentMethod}
   onChange={(e) => setSelectedPaymentMethod(e.target.value as PaymentMethod)}
  >
    <option value="UPI">UPI</option>
    <option value="CREDIT_CARD">Credit Card</option>
    <option value="DEBIT_CARD">Debit Card</option>
    <option value="NET_BANKING">Net Banking</option>
    <option value="WALLET">Wallet</option>
  </Select>
</div>

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner size="xl" />
      <span className="ml-2">Loading place details...</span>
    </div>
  );
  
  if (error) return <p className="text-center py-4 text-red-500">{error}</p>;
  if (!place) return <p className="text-center py-4">No data found</p>;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={place.image || '/placeholder-image.jpg'}
          alt={place.name}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-1000 ease-in-out opacity-70"
        />
        <div className="absolute inset-0 bg-indigo-100 opacity-40"></div>
      </div>

      <div className="relative min-w-4/5 mx-auto p-6 min-h-screen flex flex-col justify-center items-center">
        <div className="bg-transparent p-8 rounded-lg shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105">
          <div className="flex flex-col items-center mb-8 animate-fadeIn">
            <div className='flex items-center  justify-between w-full'>
              <Button 
                gradientDuoTone="purpleToBlue"
                className="mb-6"
                onClick={() => setShowModal(true)}
              >
                Book Now
              </Button>
              <h2 className="text-4xl font-bold mb-8 text-gray-800 animate-fadeIn hover:text-indigo-600 transition-colors duration-300 hover:scale-105">
                {place.name} 
                {place.isBlessed && (
                  <span className="ml-2 text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                    Blessed Place
                  </span>
                )}
              </h2>
            </div>
            <Link href={place.website} target='_blank'>
              <div className="relative bg-center w-72 h-72 mb-6 rounded-full overflow-hidden border-4 shadow-lg">
                <Image 
                  src={place.image || '/placeholder-image.jpg'} 
                  alt={place.name} 
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
            </Link>
          </div>
          
             
          <div className='mb-4 animate-slideUp bg-transparent p-4 rounded-lg transition-colors duration-300 hover:bg-white'>
            <h3 className="text-2xl mb-3 font-semibold text-gray-800 animate-fadeIn hover:text-indigo-600 transition-colors duration-300">About</h3>
            <p className="hover:font-semibold text-gray-700 mb-6 animate-slideUp hover:text-yellow-700">{place.description}</p>
          </div>
          <div className="mb-6 animate-slideUp bg-transparent p-4 rounded-lg transition-colors duration-300 hover:bg-white">
            <h3 className="text-2xl mb-3 font-semibold text-gray-800 animate-fadeIn hover:text-indigo-600 transition-colors duration-300">Address</h3>
            <p className="text-gray-700">{place.address}</p>
          </div>
          <div className="mb-6 h-64 w-full animate-fadeIn">
            <Map places={[place]} />
          </div>

          <div className="grid mt-64 grid-cols-1 md:grid-cols-2 gap-4 text-left animate-slideUp">
            <div className="bg-transparent p-4 rounded-lg transition-colors duration-300 hover:bg-white">
              <h3 className="text-lg font-semibold text-gray-800">Coordinates</h3>
              <p className="text-gray-700">
                Latitude: {place.latitude.toFixed(4)}, Longitude: {place.longitude.toFixed(4)}
              </p>
            </div>
            <div className="bg-transparent p-4 rounded-lg transition-colors duration-300 hover:bg-white">
              <h3 className="text-lg font-semibold text-gray-800">Rating</h3>
              <p className="text-gray-700">
                {place.rating} ({place.num_reviews} reviews)
              </p>
            </div>
            <div className="bg-transparent p-4 rounded-lg transition-colors duration-300 hover:bg-white">
              <h3 className="text-lg font-semibold text-gray-800">Ranking</h3>
              <p className="text-gray-700">{place.ranking}</p>
            </div>
            <div className="bg-transparent p-4 rounded-lg transition-colors duration-300 hover:bg-white">
              <h3 className="text-lg font-semibold text-gray-800">Website</h3>
              <a
                href={place.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700 transition-colors duration-300"
              >
                Visit Website
              </a>
            </div>
          </div>
       
          <Modal show={showModal} onClose={() => setShowModal(false)} size="xl">
            <Modal.Header>Book Your Visit to {place.name}</Modal.Header>
            <Modal.Body>
              <form action={handleBookingSubmit} className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold mb-3">User Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="userName">Full Name</Label>
                      <TextInput
                        id="userName"
                        value={`${user?.firstName} ${user?.lastName}` || ''}
                        disabled
                      />
                    </div>
                    <div>
                      <Label htmlFor="userEmail">Email</Label>
                      <TextInput
                        id="userEmail"
                        value={`${user?.primaryEmailAddress}` || ''}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold mb-3">Place Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="placeName">Place Name</Label>
                      <TextInput
                        id="placeName"
                        value={place.name}
                        disabled
                      />
                    </div>
                    <div>
                      <Label htmlFor="placeAddress">Address</Label>
                      <TextInput
                        id="placeAddress"
                        value={place.address}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Booking Details</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="idProofType">ID Proof Type</Label>
                      <Select id="idProofType" name="idProofType" required>
                        <option value="DRIVING_LICENSE">Driving License</option>
                        <option value="AADHAR_CARD">Aadhar Card</option>
                        <option value="PAN_CARD">PAN Card</option>
                        <option value="PASSPORT">Passport</option>
                        <option value="VOTER_ID">Voter ID</option>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="idProofNumber">ID Number</Label>
                      <TextInput
                        id="idProofNumber"
                        name="idProofNumber"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="numberOfTickets">Number of Tickets</Label>
                      <TextInput
                        id="numberOfTickets"
                        name="numberOfTickets"
                        type="number"
                        min="1"
                        value={tickets}
                        onChange={(e) => setTickets(parseInt(e.target.value))}
                        required
                      />
                    </div>
                    
                    <div>
                    <Label htmlFor="paymentMethod">Select your Payment Method</Label>
                    <Select name="paymentMethod" required>
                    <option value="UPI">UPI</option>
                    <option value="CREDIT_CARD">Credit Card</option>
                    <option value="DEBIT_CARD">Debit Card</option>
                    <option value="NET_BANKING">Net Banking</option>
                    <option value="WALLET">Wallet</option>
                    </Select>
                    </div>

                    <div className={`p-4 rounded-lg ${place.isBlessed ? 'bg-green-50' : 'bg-indigo-50'}`}>
                      {place.isBlessed ? (
                        <div>
                          <p className="text-lg font-semibold text-green-700">
                            This is a Blessed Place - Free Entry!
                          </p>
                          <p className="text-xl font-bold text-green-900">
                            Total Amount: $0
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-lg font-semibold text-indigo-700">
                            Price per ticket: ${ticketPrice}
                          </p>
                          <p className="text-xl font-bold text-indigo-900">
                            Total Amount: ${tickets * ticketPrice}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                  <Button color="gray" onClick={() => setShowModal(false)} disabled={formLoading}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    gradientDuoTone="purpleToBlue" 
                    disabled={formLoading}
                  >
                    {formLoading ? (
                      <>
                        <Spinner size="sm" className="mr-2" />
                        Processing...
                      </>
                    ) : (
                      'Confirm Booking'
                    )}
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
          <Toaster richColors />
        </div>
      </div>
    </div>
  );
};


export default TouristPlaceDetails;