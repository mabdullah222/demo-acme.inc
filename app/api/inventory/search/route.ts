import { NextRequest,NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(req: NextRequest){
    const { searchParams } = new URL(req.url);
    const query=searchParams.get('q') ?? ""
    try{
        const results=await prisma.product.findMany({where:{name:{contains:query,mode:"insensitive"}}})
        return NextResponse.json(results,{status:200})
    }
    catch(error:unknown){
        if (error instanceof Error){
            return NextResponse.json({message:"Error While finding the error"},{status:500})
        }
    }
}