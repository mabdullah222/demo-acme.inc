import { NextResponse,NextRequest } from "next/server";
import {prisma} from "@/lib/prisma"
import { SalesType } from "@/types/sales-table-types";

export async function GET() {
  const sales = await prisma.sale.findMany({ include: { saleItems: true, receipt: true,biller:true ,customer:true} });
  const salesData: SalesType[]=sales.map((sale,index)=>{
    return {key:`${index}`,productId:"1",saleDate:sale.saleDate.toLocaleString(),customerName:sale.customer.name,billerName:sale.biller.name,totalAmount:sale.totalAmount,paymentMethod:sale.receipt?.paymentMethod}
  })
  return NextResponse.json(salesData);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const dateOfSale=data.saleDate;
  const day=dateOfSale.getDay()
  const month=dateOfSale.getMonth()
  const year=dateOfSale.getFullYear()
  const sale = await prisma.sale.create({ ...data});
  return NextResponse.json(sale);
}