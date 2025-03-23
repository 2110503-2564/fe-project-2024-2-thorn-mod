"use client";
import getUserProfile from "@/libs/getUserProfile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession(); // Client-side session
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user?.token) {
        const userData = await getUserProfile(session.user.token);
        setUser(userData);
      }
    };

    fetchUser();
  }, [session]);

  return (
    <main className="flex items-center justify-center w-screen h-screen">
      {user ? <div>Name: {user.data.name}</div> : <div>Loading...</div>}
    </main>
  );
}
