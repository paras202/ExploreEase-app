// app/api/comments/[id]/like/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function POST(
    request: NextRequest, 
    { params }: { params: { id: string } }
  ) {
    const { userId } = auth();
  
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
  
    try {
      const commentId = params.id;
  
      // Try to find an existing like
      const existingLike = await prisma.like.findUnique({
        where: {
          userId_commentId: {
            userId,
            commentId
          }
        }
      });
  
      if (existingLike) {
        // Unlike the comment
        await prisma.like.delete({
          where: { id: existingLike.id }
        });
        return NextResponse.json({ liked: false });
      } else {
        // Like the comment
        await prisma.like.create({
          data: {
            userId,
            commentId
          }
        });
        return NextResponse.json({ liked: true });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      return NextResponse.json({ error: 'Failed to toggle like' }, { status: 500 });
    }
  }