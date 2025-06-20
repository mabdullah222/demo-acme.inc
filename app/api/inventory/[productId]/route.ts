import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: NextRequest, { params }: { params: { productId: string } }) {
  const { quantity } = (await req.json()) as { quantity?: number };
  if (quantity == null || quantity < 0) {
    return NextResponse.json({ error: 'quantity must be >= 0' }, { status: 400 });
  }
  const updated = await prisma.inventory.update({
    where: { id: params.productId },
    data: { quantity, lastUpdated: new Date() },
  });
  return NextResponse.json(updated);
}


export async function GET(
  req: NextRequest,
  context: { params: { productId: string } }
) {
  try {
    const { productId } = await context.params;
    console.log(productId)
    const inventoryItem = await prisma.inventory.findUnique({
      where: { id: productId },
    });

    if (!inventoryItem) {
      return NextResponse.json(
        { message: 'Inventory item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(inventoryItem, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}


