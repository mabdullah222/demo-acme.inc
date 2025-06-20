import { NextRequest, NextResponse  } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const search = new URL(req.url).searchParams.get('search') ?? '';
  const where = search
    ? { name: { contains: search, mode: 'insensitive' as const } }
    : {};
  const customers = await prisma.customer.findMany({ where, orderBy: { name: 'asc' } });
  return NextResponse.json(customers);
}

export async function POST(req: NextRequest) {
  const { name, contact } = (await req.json()) as { name?: string; contact?: string };
  if (!name || !contact) return NextResponse.json({ error: 'name & contact required' }, { status: 400 });
  const customer = await prisma.customer.create({ data: { name, contact } });
  return NextResponse.json(customer, { status: 201 });
}
