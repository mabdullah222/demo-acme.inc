import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const biller = await prisma.biller.findUnique({ where: { id: params.id } });
  if (!biller) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(biller);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const biller = await prisma.biller.update({ where: { id: params.id }, data });
  return NextResponse.json(biller);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.biller.delete({ where: { id: params.id } });
  return NextResponse.json({ message: 'Deleted' });
}