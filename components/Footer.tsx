"use client";

import React from 'react';
import Link from 'next/link';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsLinkedin } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer className="border-t-8 border-green-400 bg-white text-gray-700 dark:bg-gray-500 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-xl font-semibold">
              <span className="px-2 py-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg text-white">
                ExploreEase
              </span>
            </Link>
            <p className="mt-2 text-sm">A comprehensive web platform for travel and tourism.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-blue-500">About Us</Link></li>
              <li><Link href="/services" className="hover:text-blue-500">Our Services</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:text-blue-500">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-500">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} ExploreEase. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-blue-500"><BsFacebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-pink-500"><BsInstagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-blue-400"><BsTwitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-gray-700"><BsGithub size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-blue-700"><BsLinkedin size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}