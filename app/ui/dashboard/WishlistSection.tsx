'use client';

import React, { useEffect, useState } from 'react';
import { Card, Badge, Button } from 'flowbite-react';
import { HiHeart, HiTrash } from 'react-icons/hi';
import axios from 'axios';
import Image from "next/image";

interface WishlistItem {
  id: number;
  title: string;
  price: number;
  image: string;
  addedDate: Date;
}

const WishlistSection = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async () => {
    try {
      const response = await axios.get('/api/wishlist');
      setWishlistItems(response.data.map((item: any) => ({
        ...item,
        addedDate: new Date(item.addedDate)
      })));
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch wishlist items');
      setIsLoading(false);
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await axios.delete(`/api/wishlist?id=${id}`);
      setWishlistItems(wishlistItems.filter(item => item.id !== id));
    } catch (err) {
      setError('Failed to delete wishlist item');
    }
  };

  const handleMoveToCart = async (item: WishlistItem) => {
    // Implement move to cart logic
    console.log('Move to cart:', item);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
                  ${item.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Added {item.addedDate.toLocaleDateString()}
                </p>
                <div className="flex space-x-2 mt-2">
                  <Button 
                    size="sm" 
                    color="gray" 
                    onClick={() => handleMoveToCart(item)}
                  >
                    <HiHeart className="mr-2 h-4 w-4" />
                    Move to Cart
                  </Button>
                  <Button 
                    size="sm" 
                    color="failure"
                    onClick={() => handleDeleteItem(item.id)}
                  >
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