import { NextResponse,NextRequest } from "next/server";
import {prisma} from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const sale = await prisma.sale.findUnique({
    where: { id: params.id },
    include: { saleItems: true, receipt: true },
  });
  if (!sale) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(sale);
}