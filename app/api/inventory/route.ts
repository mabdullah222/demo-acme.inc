import { NextRequest , NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { InventoryType } from '@/types/inventory-table-types';

export async function GET(req: NextRequest) {
  try{
    const { searchParams } = new URL(req.url);
    const query=searchParams.get('q') ?? ""

    const data=await prisma.inventory.findMany({where:{product:{name:{contains:query,mode:'insensitive'}}},include:{product:true}})

    const inventoryData: InventoryType[]=data.map((item,index)=>({productId:item.id,key:`${index}`,productName:item.product.name,quantity:item.quantity,unitPrice:item.product.unitPrice,lastUpdated: `${item.lastUpdated}`}))
    
    return NextResponse.json(inventoryData,
    {status:200})
    
  }catch(error:any){
    console.error(error.message)
    return NextResponse.json({"message":"Error Occured while retrieving the inventory items"},{status:500})
  }
  
}