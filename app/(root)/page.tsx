

    import { Button } from '@/components/ui/button';
    import { 
    
      UserButton, SignedIn } from '@clerk/nextjs';



    export default function Home() {
      console.log(UserButton);
      
      return (


      
      < div className='p-4'>
      

    <UserButton afterSignOutUrl="/" />

        


      </div>


      

      );
    }
