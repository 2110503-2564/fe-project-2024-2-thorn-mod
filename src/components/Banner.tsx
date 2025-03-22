'use client'
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { useSession } from "next-auth/react";

export default function Banner() {
    const {data:session}  = useSession();

    const router = useRouter(); // Initialize useRouter

    const banner = [
        '/img/cover.jpg',
        '/img/cover2.jpg',
        '/img/cover3.jpg',
        '/img/cover4.jpg'
    ];

    const [index, setIndex] = useState(0);

    const changeBanner = () => {
        setIndex((index + 1) % banner.length);
    };

    const handleNavigate = (event: React.MouseEvent) => {
        event.stopPropagation(); 
        router.push('/reservation'); 
    };

    return (
        <div 
            className="relative flex w-full h-screen m-0 p-10 shadow-lg text-center " 
            onClick={changeBanner}
        >
            
            <div> 
                <Image 
                    src={banner[index]} 
                    alt="banner"
                    layout="fill"
                    style={{ objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            </div>

            {/* {session?
            <div className=" flex absolute right-0 px-5 bg-white rounded-md ">
                Welcome {session?.user.name}
            </div>: null
            } */}

            <h1 className="relative flex items-center justify-center text-white text-[30px] font-bold">Restaurant Reservation</h1>

          
            <button 
                className="absolute bottom-5 right-5 bg-green-600 text-white px-5 py-5  rounded-lg text-lg font-semibold hover:bg-slate-300 hover:text-blue-600 transition"
                onClick={handleNavigate}
            >
                Select Restaurant
            </button>
        </div>
    );
}
