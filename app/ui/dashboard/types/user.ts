// types/user.ts
export interface User {
    id: string;
    username: string | null;
    email: string | null;
    imageUrl: string;
    phoneNumber: string | null;
    isVerified: boolean;
  }