"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsLinkedin } from 'react-icons/bs';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted', formData);
  };

  const socialLinks = [
    { 
      icon: <BsGithub size={24} />, 
      href: "https://github.com/paras202/ExploreEase-app", 
      label: "GitHub Repository" 
    },
    { 
      icon: <BsLinkedin size={24} />, 
      href: "#", // Replace with actual LinkedIn profile
      label: "LinkedIn Profile" 
    },
    { 
      icon: <BsFacebook size={24} />, 
      href: "#", // Replace with actual LinkedIn profile
      label: "LinkedIn Profile" 
    },
    { 
      icon: <BsInstagram size={24} />, 
      href: "#", // Replace with actual LinkedIn profile
      label: "LinkedIn Profile" 
    },
    { 
      icon: <BsTwitter size={24} />, 
      href: "#", // Replace with actual LinkedIn profile
      label: "LinkedIn Profile" 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Contact Header */}
        <div className="flex flex-col items-center justify-center mb-16 animate-fade-in">
          <Link href="http://sliet.ac.in/">
            <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden border-4 shadow-lg">
              <Image 
                src="/logo.jpg" 
                alt="SLIET Logo" 
                layout="fill"
                objectFit="contain"
                className="transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>
          </Link>
          <h1 className="text-4xl font-bold text-center text-indigo-600 transition-colors duration-300 ease-in-out hover:text-gray-900">
            Contact Us
          </h1>
          <p className="mt-2 text-xl text-gray-600">Get in Touch with ExploreEase Team</p>
        </div>

        {/* Contact Content */}
        <div className="grid md:grid-cols-2 gap-8 animate-slide-in-left">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8 transition-shadow duration-300 ease-in-out hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Contact Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="text-indigo-600" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a 
                    href="mailto:exploreease@example.com" 
                    className="text-gray-700 hover:text-indigo-600 transition-colors"
                  >
                    exploreease39@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Phone className="text-indigo-600" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <a 
                    href="tel:+91-9876543210" 
                    className="text-gray-700 hover:text-indigo-600 transition-colors"
                  >
                    +91-9876543210
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <MapPin className="text-indigo-600" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-gray-700">
                    Sant Longowal Institute of Engineering and Technology, 
                    Longowal, Sangrur, Punjab
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8 transition-shadow duration-300 ease-in-out hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;