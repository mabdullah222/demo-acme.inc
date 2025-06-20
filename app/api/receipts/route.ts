import { NextResponse,NextRequest } from "next/server";
import {prisma} from "@/lib/prisma"

export async function GET() {
  const receipts = await prisma.receipt.findMany({ include: { sale: true } });
  return NextResponse.json(receipts);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const receipt = await prisma.receipt.create({ data });
  return NextResponse.json(receipt);
}