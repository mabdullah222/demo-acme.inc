import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"


export async function POST(req: NextRequest) {
  const { name, unitPrice } = (await req.json()) as {
    name?: string;
    unitPrice?: number;
  };

  if (!name || unitPrice == null) {
    return NextResponse.json(
      { error: 'name and unitPrice are required' },
      { status: 400 },
    );
  }

  const product = await prisma.product.create({
    data: { name, unitPrice },
  });

  await prisma.inventory.create({
    data: {
      productId: product.id,
      quantity: 0,
    },
  });

  return NextResponse.json(product, { status: 201 });
}


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit=parseInt(searchParams.get('limit') ?? '10')
  const cursor=searchParams.get('cursor')
  console.log(cursor)
  const items=await prisma.product.findMany({
    include:{Inventory:true},
    take: limit + 1,
    ...(cursor && {
      skip: 1,
      cursor: { id: cursor },
    }),
    orderBy: { id: 'desc' },
  });

  const hasMore= items.length>limit
  const result=hasMore ? items.slice(0,-1):items;
  return NextResponse.json({items:result,nextCursor:hasMore? result[result.length - 1].id : null})
}