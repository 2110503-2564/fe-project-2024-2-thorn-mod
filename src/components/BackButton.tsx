'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button 
      className="bg-[#525CEB] text-white h-[42px] w-[120px] rounded-lg text-lg font-semibold hover:bg-[#3D3B40] hover:text-white transition"
      onClick={() => router.push('/')}
    >
      Back
    </button>
  );
}
