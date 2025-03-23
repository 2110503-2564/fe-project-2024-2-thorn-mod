
// import Link from "next/link";
// import TopMenuItem from "./TopMenuItem";
// import Image from "next/image";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

// export default async function TopMenu(){
//     const session = await getServerSession(authOptions);

//     return (
//         <div className="fixed top-0 left-0 right-0 w-screen h-[50px] z-30 bg-white border-t border-b 
//         border-gray-400 flex flex-row justify-end shadow-lg">
            
//             <TopMenuItem title="Menu Item Booking" pageref="/booking"></TopMenuItem>
//             <Image 
//                 src={'/img/logo.png'}
//                 alt="logo"
//                 width={0}
//                 height={0}
//                 sizes="100vw"
//                 className="h-[100%] w-[100px]"
//             />
//             <div className="absolute left-0 flex row h-full">{session? 
//                 <Link href={'/api/auth/signout'} > 
//                     <div className="flex items-center h-full px-5 text-md"> 
//                     Sign-Out {session.user?.name}
//                     </div>
//                 </Link> : 
//                 <Link href={'/api/auth/signin'}>
//                     <div className="flex items-center h-full px-5 text-md"> 
//                     Sign-In
//                     </div>
//                 </Link>
//                 }
//                 <Link href={'/myBooking'}>
//                     <div className="flex items-center h-full px-5 text-md"> 
//                     My Booking
//                     </div>
//                 </Link>
//                 </div> 
//         </div>
//     );
// }

// ./src/components/TopMenu.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ClientTopMenu from "./ClientTopMenu";


export default async function TopMenu() {
  const session = await getServerSession(authOptions);
  
  return <ClientTopMenu  />;
}