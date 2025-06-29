import { NextResponse,NextRequest } from "next/server";
import { uploadFile } from "@/lib/uploadFile";
import {prisma} from "@/lib/prisma"


export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }>  }) {
  const {id}=await params
  const product = await prisma.product.findUnique({
    where: { id: id},
    include: { Inventory: true },
  });
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }>  }) {
  const {id} =await params
  const data : FormData = await req.formData()
  const image=data.get('image') as File | null;
  let body={}
  if (image==null){
    body={name:data.get('name'),unitPrice:parseFloat(data.get('unitPrice') as string)}
  }else{
    const imageUrl=await uploadFile(image)
     body={name:data.get('name'),unitPrice:parseFloat(data.get('unitPrice') as string),imageUrl:imageUrl}
  }

  const product = await prisma.product.update({
    where: { id: id },
    data: body,
  });

  return NextResponse.json(product);
}

export async function DELETE(req: Request,{params}:{params: Promise<{ id: string }> }){
  try{
    const {id}=await params;
    await prisma.product.delete({where:{id:id}})
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