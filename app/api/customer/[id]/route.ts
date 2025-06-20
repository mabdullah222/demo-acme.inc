import { NextResponse,NextRequest } from "next/server";
import {prisma} from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const customer = await prisma.customer.findUnique({ where: { id: params.id } });
  if (!customer) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(customer);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const customer = await prisma.customer.update({ where: { id: params.id }, data });
  return NextResponse.json(customer);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.customer.delete({ where: { id: params.id } });
  return NextResponse.json({ message: 'Deleted' });
}