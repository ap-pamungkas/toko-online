import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PATCH(
    req: Request,
    {params}: {params: {storeId:string}}
){
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name } = body;

        if(!userId){
            return new NextResponse("Unauthenticated", { status: 401 });   
        }

        if(!name){
            return new NextResponse("harus menginput Nama", {status:400});
        }

        if(!params.storeId){
            return new NextResponse("Store  Dibutuhkan", {status:400});
        }

        const store = await db.store.update({
            where: {
                id: params.storeId,
                userId
            },
            data: {
                name
            }
        });

        return  NextResponse.json(store);
        
    } catch (error) {
            console.log("[STORES_PATCH]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
            
    }
}




export async function DELETE(
    req: Request,
    {params}: {params: {storeId:string}}
){
    try {
        const { userId } = auth();
       

        if(!userId){
            return new NextResponse("Unauthenticated", { status: 401 });   
        }

       

        if(!params.storeId){
            return new NextResponse("Store  Dibutuhkan", {status:400});
        }

        const store = await db.store.deleteMany({
         where: {
             id: params.storeId,
             userId
         }
        });

        return  NextResponse.json(store);
        
    } catch (error) {
            console.log("[STORES_DELETE]", error);
            return new NextResponse("Internal Server Error", { status: 500 });
            
    }
} 