'use client'
// ./src/components/ClientTopMenu.tsx
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ClientTopMenu({ session }: { session: any }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 w-screen h-[64px] z-30 bg-white border-b border-gray-400 flex items-center justify-between px-6 shadow-lg">
      {/* Logo */}
      <div className="flex items-center justify-center">
        <Image 
          src={'/img/logo_with_title.png'}
          alt="logo"
          width={0}
          height={0}
          sizes="100vw"
          className="h-[40px] w-auto"
        />
      </div>

      {/* Desktop Navigation Links */}
      <div className="block flex">
      <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-4 bg-white rounded"
        >
          <div className="w-6 h-1 bg-black mb-1"></div>
          <div className="w-6 h-1 bg-black mb-1"></div>
          <div className="w-6 h-1 bg-black"></div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="absolute top-[64px] right-0 w-96 h-screen bg-white shadow-lg z-40">
          <Link href={'/restaurant'} onClick={() => setMenuOpen(false)}>
            <div className="p-4 border-b hover:bg-gray-100">Menu Item Booking</div>
          </Link>
          <Link href={'/myBooking'} onClick={() => setMenuOpen(false)}>
            <div className="p-4 border-b hover:bg-gray-100">My Booking</div>
          </Link>

          {session ? 
            <Link href={'/api/auth/signout'} onClick={() => setMenuOpen(false)}>
              <div className="p-4 border-b hover:bg-gray-100">Sign-Out {session.user?.name}</div>
            </Link> : 
            <Link href={'/api/auth/signin'} onClick={() => setMenuOpen(false)}>
              <div className="p-4 border-b hover:bg-gray-100">Sign-In</div>
            </Link>
          }
        </div>
      )}
    </div>
  );
}