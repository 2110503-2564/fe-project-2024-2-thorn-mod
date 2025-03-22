"use client" 
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ReservationItem, ReservationJson } from "../../../interface";
import getReservations from "@/libs/getReservations";
import deleteReservation from "@/libs/deleteReservation";

export default function Reservations() {
    const { data: session, status } = useSession();
    const [reservations, setReservations] = useState<ReservationItem[]>([]);
    const [error, setError] = useState(null);
    const [cancelRes,setCancelRes] = useState<string|null>(null);
    const [isCancel,setCancel] = useState(false);

    useEffect(() => {
        if (status === "authenticated") {
            if(isCancel){
                cancelReservation();
                setCancel(false);
            }
            fetchReservations();

        }
    }, [status,cancelReservation]);

    async function fetchReservations() {
        if (!session?.user?.token) {
            Error("User is not authenticated");
            return Error;
        }

        try {
            const fetchdata : ReservationJson= await getReservations(session.user.token);
            setReservations(fetchdata.data);
        } catch (error) {
            console.error("Failed to fetch reservations:", error);
        }
    }

    async function cancelReservation(){
        if (!session?.user?.token) {
            Error("User is not authenticated");
            return Error;
        }

        if (!cancelRes) {
            Error("No Reservation Id");
            return Error;
        }

        try {
            const cancel = await deleteReservation({rid:cancelRes,token: session.user.token});
            fetchReservations();
        } catch (error) {
            console.error("Failed to fetch reservations:", error);
        }
    }

    if (status === "loading") return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex justify-center items-center min-h-screen "> 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mt-20">
                {reservations.length > 0 ? (
                    reservations.map((reservation) => (
                        <div 
                            key={reservation._id}  
                            className=" bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500 transition hover:shadow-xl ml-10 "
                        >
                            <div className="text-2xl font-semibold text-gray-700 mb-2">{reservation.restaurant.name}</div>
                            <div className="text-gray-600">Name: {session?.user.name}</div>
                            <div className="text-gray-600">Date: {reservation.reservationDate}</div>
                            <div className="text-gray-600">Time: {reservation.reservationTime}</div>
                            
                            <button 
                                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md shadow-md transition"
                                onClick={(e) => {setCancelRes(reservation._id); setCancel(true); }}
                            >
                                Cancel Reservation
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="text-xl text-gray-500 mt-10">No Reservation</div>
                )}
            </div>
        </div>
    );
}
