import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { storeId: string };
} ){
    const { userId } = auth();

    console.log("User ID:", userId);

    if (!userId) {
        console.log("No userId found, redirecting to sign-in");
        return redirect("sign-in");
    }

    const store = await db.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    console.log("Store:", store);

    if (!store) {

        return redirect('/');
    }

    return (
        <>
          <Navbar/>
            {children}
        </>
    );
};