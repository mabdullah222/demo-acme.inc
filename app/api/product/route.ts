import { NextRequest, NextResponse } from "next/server";

import {prisma} from "@/lib/prisma"
import { uploadFile } from "@/lib/uploadFile";


export async function POST(req: NextRequest) {
  const data=await req.formData()
  const imageUrl=await uploadFile(data.get('image') as File);

  const product = await prisma.product.create({
    data: {
      name:data.get('name') as string,
      unitPrice:parseFloat(data.get('unitPrice') as string),
      imageUrl:imageUrl,
    },
  })

  await prisma.inventory.create({
    data: {
      productId: product.id,
      quantity: 0,
    },
  })

  return NextResponse.json(product, { status: 201 })
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