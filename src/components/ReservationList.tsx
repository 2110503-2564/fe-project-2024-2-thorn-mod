'use clinet'
import { reservationSlice } from "@/redux/features/reservationSlice";
import { AppDispatch, AppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeReservation } from "@/redux/features/reservationSlice";
import { useState, useEffect } from "react";
import { ReservationItem, ReservationJson } from "../../interface";



export default async function ReservationList({reservationJson}:{reservationJson?:Promise<ReservationJson>|null}) {
    
    const [reservations,setReservations] = useState<ReservationItem[]>([]);
    useEffect (()=>{
        pullReservation()
    },[])

    async function pullReservation(){
        if (reservationJson){
            const fetchRes = await reservationJson;
            setReservations(fetchRes.data)
        }
        
    }
    
    if (!reservationJson) return <p>No reservations available.</p>;
    
    return (
        <>
            

             { (reservations.length>0)?(
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                    {reservations.map((reservationItem) => (
                        <div 
                            className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500 transition hover:shadow-xl" 
                
                        >
                            <div  className="text-2xl font-semibold text-gray-700 mb-2">{reservationItem.user}</div >
                            <div className="text-gray-600">ID: {reservationItem.user}</div >
                            <div className="text-gray-600">reservation Date: {reservationItem.reservationTime}</div >
                            <div  className="text-gray-600">CreateAt: {reservationItem.createdAt}</div >

                            <button 
                                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md shadow-md transition"
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
