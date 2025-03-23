'use client'
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { useSession } from "next-auth/react";

export default function Banner({ banners }: { banners: string[] }) {
    const {data:session}  = useSession();

    const router = useRouter(); // Initialize useRouter

    // const banner = [
    //     '/img/cover.jpg',
    //     '/img/cover2.jpg',
    //     '/img/cover3.jpg',
    //     '/img/cover4.jpg'
    // ];

    const [index, setIndex] = useState(0);

    const changeBanner = () => {
        setIndex((index + 1) % banners.length);
    };

    const handleNavigate = (event: React.MouseEvent) => {
        event.stopPropagation(); 

        if (session) {
            router.push('/reservation');
        } else {
            alert("Please log in before use.");
            router.push('/api/auth/signin');
        }
    };

    return (
        <div className="relative flex w-full h-screen m-0 p-10 shadow-lg text-center" 
        onClick={changeBanner}>
                <Image 
                    src={banners[index]} 
                    alt="banner"
                    layout="fill"
                    priority
                    className="object-cover transition-opacity duration-700 opacity-100"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
{/* 
            {session?
            <div className="flex absolute top-20 right-6 px-5 py-5 z-10 bg-white rounded-md ">
                Welcome {session.user.name ?? 'Guest'}
            </div>: null
            } */}

            <div className="absolute inset-0 flex flex-col justify-center items-center space-y-5">
                <h1 className="text-white text-5xl font-bold">Restaurant Reservation</h1>

                <h3 className="text-white text-lg max-w-2xl">
                    Welcome to Restaurant Reservation
                    Discover your favorite restaurants and book a table in just a few clicks.
                    No more waiting in lines — make every meal memorable.
                </h3>

                <div className="grid grid-cols-xl space-x-5 space-y-5">
                    <button 
                        className="bg-[#525CEB] text-white h-[60px] w-[200px] rounded-lg text-lg font-semibold hover:bg-white hover:text-[#525CEB] transition"
                        onClick={handleNavigate}
                        >Reservation
                    </button>
                    <button 
                        className="bg-[#3D3B40] text-white h-[60px] w-[200px] rounded-lg text-lg font-semibold hover:bg-white hover:text-[#3D3B40] transition"
                        onClick={() => router.push('/restaurant')}
                        >View Restaurant
                    </button>
                </div>
                
            </div>  
        </div>
    );
}
