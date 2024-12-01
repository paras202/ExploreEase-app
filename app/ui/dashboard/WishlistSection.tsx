"use client"
import React from 'react';
import { useState } from 'react';
import { Card, Badge, Button } from 'flowbite-react';
import { HiHeart, HiTrash } from 'react-icons/hi';
import Image from "next/image"; 

const WishlistSection = () => {
  const [wishlistItems] = useState([
    {
      id: 1,
      title: 'Product One',
      price: 99.99,
      addedDate: new Date('2024-03-15'),
      image: '/api/placeholder/200/200'
    },
    {
      id: 2,
      title: 'Product Two',
      price: 149.99,
      addedDate: new Date('2024-03-20'),
      image: '/api/placeholder/200/200'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          My Wishlist
        </h2>
        <Badge color="info">
          {wishlistItems.length} items
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {wishlistItems.map((item) => (
          <Card key={item.id}>
            <div className="flex space-x-4">
            <Image
            src={item.image}
            alt={item.title}
            className="h-24 w-24 rounded-lg object-cover"
            width={120}
            height={120}
            />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                  ${item.price}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Added {item.addedDate.toLocaleDateString()}
                </p>
                <div className="flex space-x-2 mt-2">
                  <Button size="sm" color="gray">
                    <HiHeart className="mr-2 h-4 w-4" />
                    Move to Cart
                  </Button>
                  <Button size="sm" color="failure">
                    <HiTrash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WishlistSection;