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
        router.push('/venue'); 
    };

    return (
        <div 
            className="flex relative w-[100vw] h-[30vw] m-0 p-10 shadow-lg text-center " 
            onClick={changeBanner}
        >
            <Image 
                src={banner[index]} 
                alt="banner"
                fill
                style={{ objectFit: "cover" }}
            />

            {
            session?
            <div className=" flex absolute right-0 p-5 bg-white rounded-md ">
                Welcome {session?.user.name}
            </div>: null
            }

            <div className="relative top-[200px] w-[700px] 
            h-[70px] mx-auto bg-[#f5ebd6] text-black text-[30px] font-bold font-sans text-center rounded-[5px] 
            shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,1)] pt-[10px]">
                <h1>Where every event finds its venue</h1>
            </div>

          
            <button 
                className="absolute bottom-5 right-5 bg-blue-500 text-white px-5 py-5  rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
                onClick={handleNavigate}
            >
                Select Venue
            </button>
        </div>
    );
}
