"use client";
import { useDispatch } from "react-redux";
import { removeReservation } from "@/redux/features/reservationSlice";
// Importing types for reservation data
import { ReservationItem } from "../../interface"; // Assuming you have this type defined

type ReservationListProps = {
  reservations: ReservationItem[];
  // reservations: RestaurantClass[];
};

export default function ReservationList({
  reservations,
}: ReservationListProps) {
  const dispatch = useDispatch();

  // return (
  //   <div className="border-2 border-red-500">
  //     {reservations.map((res) => {
  //       return (
  //         <div className="flex flex-col gap-y-3 p-4" key={res.id}>
  //           <p>{res.name}</p>
  //           <p>{res.resevationTime}</p>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );

  return (
    <>
      {reservations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {reservations.map((reservationItem) => (
            <div
              key={reservationItem._id}
              className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500 transition hover:shadow-xl"
            >
              <div className="text-2xl font-semibold text-gray-700 mb-2">
                {reservationItem.restaurant.name}
              </div>
              {/* <div className="text-gray-600">ID: {reservationItem.user}</div> */}
              <div className="text-gray-600">
                {`Reservation Date: ${reservationItem.reservationTime ?? ""}`}
              </div>
              {/* <div className="text-gray-600">
                CreatedAt: {reservationItem.createdAt}
              </div> */}
              <button
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md shadow-md transition"
                onClick={() =>
                  dispatch(
                    removeReservation({
                      _id: reservationItem._id,
                      user: reservationItem.user,
                      reservationTime: reservationItem.reservationTime,
                      createdAt: reservationItem.createdAt,
                      restaurant: reservationItem.restaurant,
                    })
                  )
                }
              >
                Cancel reservation
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-xl text-gray-500 mt-10">No Reservations</div>
      )}
    </>
  );
}
