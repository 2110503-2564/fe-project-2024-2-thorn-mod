'use client'
import { reservationSlice } from "@/redux/features/reservationSlice";
import { AppDispatch, AppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeReservation } from "@/redux/features/reservationSlice";

export default function ReservationList() {
    const reservation = AppSelector((state) => state.reserve.ReservationItems);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <>
            

             { (reservation.length>0)?(
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                    {reservation.map((reservationItem) => (
                        <div 
                            className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500 transition hover:shadow-xl" 
                
                        >
                            <div  className="text-2xl font-semibold text-gray-700 mb-2">{reservationItem.restaurant.name}</div >
                            <div className="text-gray-600">ID: {reservationItem.user}</div >
                            <div className="text-gray-600">reservation Date: {reservationItem.reservationTime}</div >
                            <div  className="text-gray-600">CreateAt: {reservationItem.createdAt}</div >

                            <button 
                                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md shadow-md transition"
                                onClick={() => dispatch(removeReservation( {_id: reservationItem._id,
                                    user: reservationItem.user,
                                    reservationTime: reservationItem.reservationTime,
                                    createdAt: reservationItem.createdAt,
                                    restaurant: reservationItem.restaurant
                                }))}
                            >
                                Cancel reservation
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div  className="text-xl text-gray-500 mt-10">No Reservation</div >
            )}
        </>
    );
}
