import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/db';

export async function GET() {
  try {
    const wishlistItems = await db.wishlistItem.findMany({
      orderBy: { addedDate: 'desc' }
    });
    return NextResponse.json(wishlistItems);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, price, image } = await request.json();
    const newItem = await db.wishlistItem.create({
      data: { title, price, image }
    });
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await db.wishlistItem.delete({ where: { id: Number(id) } });
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}