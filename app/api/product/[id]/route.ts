import { NextResponse,NextRequest } from "next/server";
import {prisma} from "@/lib/prisma"


export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { Inventory: true },
  });
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = (await req.json()) as Partial<{ name: string; unitPrice: number }>;
  const product = await prisma.product.update({
    where: { id: params.id },
    data: body,
  });
  return NextResponse.json(product);
}

export async function DELETE(req: Request,{params}:{params:{id:string}}){
  try{
    await prisma.product.delete({where:{id:params.id}})
    return NextResponse.json({"message":"Deleted Successfully"},{status:200})
  }catch(error){
    if (error instanceof Error){
      return NextResponse.json({message:error.message},{status:500})
    }
    else{
      return NextResponse.json({message:"An unexpected error occured"},{status:500})
    }
  }
}