import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/app/lib/db';

// Create a comment
export async function POST(request: NextRequest) {
  const { userId, sessionId } = auth();

  // Check if user is authenticated
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { placeId, content, userName, userImage } = await request.json();

    // Validate input
    if (!placeId || !content) {
      return NextResponse.json({ error: 'Place ID and content are required' }, { status: 400 });
    }

    // Create comment
    const comment = await db.comment.create({
      data: {
        placeId,
        content,
        userId,
        userName,
        userImage
      }
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}

// Get comments for a place
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const placeId = searchParams.get('placeId');
    const { userId } = auth();

    if (!placeId) {
      return NextResponse.json({ error: 'Place ID is required' }, { status: 400 });
    }

    // Fetch comments with likes and current user's like status
    const comments = await db.comment.findMany({
      where: { placeId },
      orderBy: { createdAt: 'desc' },
      include: {
        likes: {
          where: userId ? { userId } : undefined,
          select: { id: true }
        },
        _count: {
          select: { 
            likes: true,
            replies: true 
          }
        }
      }
    });

    // Transform comments to include like count and current user's like status
    const transformedComments = comments.map(comment => ({
      ...comment,
      likeCount: comment._count.likes,
      replyCount: comment._count.replies,
      isLikedByUser: comment.likes.length > 0
    }));

    return NextResponse.json(transformedComments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}