import db from "@/lib/db";
import { UserButton } from "@clerk/nextjs";

interface DashboardProps {
   params: {
    storeId: string;
   }
}



const DashboardPage = async ({params}: DashboardProps) => {
    const store = await db.store.findFirst({
        where: {
            id: params.storeId,
        }
    });
    return (
        <div>

        
            active store = {store?.name}
        </div>
      );
}
 
export default DashboardPage;