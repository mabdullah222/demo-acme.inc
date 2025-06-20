import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const billers = await prisma.biller.findMany();
  return NextResponse.json(billers);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const biller = await prisma.biller.create({ data });
  return NextResponse.json(biller);
}