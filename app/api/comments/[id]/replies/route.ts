import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { currentUser } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { content } = await request.json();
    const commentId = params.id;

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const reply = await prisma.reply.create({
      data: {
        content,
        commentId,
        userId,
        userName: user?.fullName || 'Anonymous',
        userImage: user?.imageUrl
      }
    });

    return NextResponse.json(reply, { status: 201 });
  } catch (error) {
    console.error('Error adding reply:', error);
    return NextResponse.json({ error: 'Failed to add reply' }, { status: 500 });
  }
}

export async function GET(   
    request: NextRequest,    { params }: { params: { id: string } } 
) {   
    try 
    {    
        const commentId = params.id;      
        const replies = await prisma.reply.findMany({       
            where: { commentId },       
            orderBy: { createdAt: 'desc' }     
        });      
        return NextResponse.json(replies);   
    } catch (error) {     
        console.error('Error fetching replies:', error);     
        return NextResponse.json({ error: 'Failed to fetch replies' }, { status: 500 });   
    } 
}