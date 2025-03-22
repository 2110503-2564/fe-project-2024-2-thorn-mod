import Banner from "@/components/Banner";
import BannerCarousel from "@/components/BannerCarousel";
import CardPanel from "@/components/CardPanel";

import { useSession } from "next-auth/react";

export default function Home() {

  // const {data:session}  = useSession();

  return (
    <main >
      {/* {session?
        <div className=" flex absolute right-0 px-5 bg-white rounded-md ">
          Welcome {session?.user.name}
        </div>: null
      } */}
      <Banner/>
      <div className="relative text-center px-10 py-10">
        <h1 className="Noto Sans Thai">Restaurant Reservation</h1>
      </div>
      <BannerCarousel/>
    </main>
  );
}
