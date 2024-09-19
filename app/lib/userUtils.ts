// lib/userUtils.ts
import { auth, currentUser } from '@clerk/nextjs/server';

export async function getCurrentUser() {
  const user = await currentUser();
  
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    email: user.emailAddresses[0]?.emailAddress,
    imageUrl: user.imageUrl,
    phoneNumber: user.phoneNumbers[0]?.phoneNumber,
    isVerified: user.emailAddresses[0]?.verification?.status === 'verified'
  };
}