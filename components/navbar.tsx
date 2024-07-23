import { UserButton } from "@clerk/nextjs";
import { MainNav } from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";
const Navbar = async () => {

    const {userId} = auth();

    if(!userId){
        redirect("sign-in")
    }
    const stores = await db.store.findMany({
        where:{
            userId
        }
    })
    return (
        <div className="border-b border-gray-200 ">
            <div className="h-16 items-center flex px-4">
                  <StoreSwitcher items={stores} />
                    <MainNav className="mx-6" />

                        <div className="ml-auto flex items-center ml-x-4">
                            
                    <UserButton />
                        </div>
            </div>
           </div>
    );
};

export default Navbar;