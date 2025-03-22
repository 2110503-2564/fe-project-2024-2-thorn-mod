'use client'

import Image from "next/image";
import { useState, useEffect } from 'react';

const images = [
  { src: '/img/cover.jpg', title: 'title 1', desc: 'desc 1' },
  { src: '/img/cover2.jpg', title: 'title 2', desc: 'desc 2' },
  { src: '/img/cover3.jpg', title: 'title 3', desc: 'desc 3' },
  // เพิ่มรูปภาพและข้อความได้ตามต้องการ
];

export default function Banner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-screen h-screen px-[10%] py-24 grid grid-cols-2">
        <div className="relative">
        <Image
            src={images[currentImageIndex].src}
            alt="banner"
            layout="fill"
            objectFit="cover"
        />
    </div>

    <div className="flex items-center text-center bg-[#BFCFE7] text-white">
        <div className="p-4">
        <h1 className="text-4xl font-bold mb-2">{images[currentImageIndex].title}</h1>
        <p className="text-lg">{images[currentImageIndex].desc}</p>
        </div>
    </div>

    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-[12%] py-24">
        <button onClick={prevImage} className="rounded-full bg-white px-[3%] py-[2%] shadow-md"> / </button>
        <button onClick={nextImage} className="rounded-full bg-white px-[3%] py-[2%] shadow-md"> \ </button>
    </div>

    </div>
  );
}
