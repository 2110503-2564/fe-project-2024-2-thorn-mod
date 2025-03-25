import BackButton from "@/components/BackButton";
import getRestaurant from "@/libs/getRestaurant";
import Image from "next/image";


export default async function VenueDetail({ params }: { params: { rid: string } }) {
  const venueData = await getRestaurant(params.rid);

  return (
    <main className="min-h-screen pt-24 px-4 flex flex-col items-center">
      {/* <main className="p-10 bg-gray-50 min-h-screen flex items-center"></main> */}
      <div className="w-full max-w-4xl flex justify-start mb-4">
        <BackButton />
      </div>

      <div className="bg-white shadow-lg rounded-lg px-35 py-10 max-w-4xl ">
        <div className="flex flex-col md:flex-row items-center md:items-start px-5">
          {/* รูปภาพ Venue */}
          <Image
            src={venueData.data.picture}
            alt={venueData.data.name}
            width={500}
            height={300}
            className="rounded-lg w-full md:w-1/3 object-cover shadow-md"
          />

          {/* ข้อมูล Venue */}
          <div className="md:ml-10 mt-5 md:mt-0 w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 ">
              {venueData.data.name}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
              <p><span className="font-semibold text-gray-900">Name:</span> {venueData.data.name}</p>
              <p><span className="font-semibold text-gray-900">Address:</span> {venueData.data.address}</p>
              <p><span className="font-semibold text-gray-900">Tel:</span> {venueData.data.tel}</p>
              <p><span className="font-semibold text-gray-900">Open - Close:</span> {venueData.data.openTime} - {venueData.data.closeTime} </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
