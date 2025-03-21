'use client'
import { AppDispatch, AppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeBooking } from "@/redux/features/bookSlice";

export default function BookingList() {
    const booking = AppSelector((state) => state.book?.bookItems);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <>
            

             { (booking.length>0)?(
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                    {booking.map((BookingItem) => (
                        <div 
                            className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500 transition hover:shadow-xl" 
                
                        >
                            <div  className="text-2xl font-semibold text-gray-700 mb-2">{BookingItem.venue}</div >
                            <div className="text-gray-600">Name: {BookingItem.nameLastname}</div >
                            <div className="text-gray-600">Contact: {BookingItem.tel}</div >
                            <div  className="text-gray-600">Booking Date: {BookingItem.bookDate}</div >

                            <button 
                                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md shadow-md transition"
                                onClick={() => dispatch(removeBooking( {nameLastname: BookingItem.nameLastname,
                                    tel: BookingItem.tel,
                                    venue: BookingItem.venue,
                                    bookDate: BookingItem.bookDate}))}
                            >
                                Cancel Booking
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div  className="text-xl text-gray-500 mt-10">No Venue Booking</div >
            )}
        </>
    );
}
