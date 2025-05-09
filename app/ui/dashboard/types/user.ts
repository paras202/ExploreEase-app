// types/user.ts
export interface User {
  id: string;
  username: string | null;
  email: string;
  imageUrl: string;
  phoneNumber: string;
  isVerified: boolean;
}