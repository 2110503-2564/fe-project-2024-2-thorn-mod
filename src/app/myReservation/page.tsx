"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ReservationItem, ReservationJson } from "../../../interface";
import getReservations from "@/libs/getReservations";
import deleteReservation from "@/libs/deleteReservation";
import updateReservation from "@/libs/updateReservation";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

export default function Reservations() {
    const { data: session, status } = useSession();
    const [reservations, setReservations] = useState<ReservationItem[]>([]);
    const [cancelRes, setCancelRes] = useState<string | null>(null);
    const [editRes, setEditRes] = useState<string | null>(null);
    const [editedDate, setEditedDate] = useState("");
    const [editedTime, setEditedTime] = useState<Dayjs | null>(dayjs());
    const [isCancel, setCancel] = useState(false);

    useEffect(() => {
        if (status === "authenticated") {
            if (isCancel){
                cancelReservation();
            }
            fetchReservations();
        }
    }, [status,isCancel]);

    async function fetchReservations() {
        if (!session?.user?.token) return console.error("User is not authenticated");

        try {
            const fetchdata: ReservationJson = await getReservations(session.user.token);
            setReservations(fetchdata.data);
        } catch (error) {
            console.error("Failed to fetch reservations:", error);
        }
    }

    async function cancelReservation() {
        if (!session?.user?.token || !cancelRes) return console.error("Invalid cancel request");

        try {
            await deleteReservation({ rid: cancelRes, token: session.user.token });
            setCancelRes(null);
            fetchReservations();
        } catch (error) {
            console.error("Failed to cancel reservation:", error);
        }
    }

    async function handleEditSubmit() {
        if (!session?.user?.token || !editRes) return console.error("Invalid edit request");

        try {
            await updateReservation({
                reservationID: editRes,
                token: session.user.token,
                req: {
                    reservationDate: editedDate,
                    reservationTime: editedTime? editedTime?.format("HH:mm"):"",
                },
            });
            setEditRes(null);
            fetchReservations();
        } catch (error) {
            console.error("Failed to update reservation:", error);
        }
    }

    if (status === "loading") return <p>Loading...</p>;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex justify-center items-center min-h-screen">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-6 w-full max-w-4xl mt-20">
                    {editRes ? (
                        <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50">
                        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500 w-96">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Reservation</h2>
                            <label className="block text-gray-600 mb-2">Date</label>
                            <input
                                type="date"
                                value={editedDate}
                                onChange={(e) => setEditedDate(e.target.value)}
                                className="border p-2 w-full mb-4"
                            />
                            <label className="block text-gray-600 mb-2">Time</label>
                            <TimePicker
                                className="w-full"
                                ampm={false}
                                label="24 hours"
                                value={editedTime}
                                onChange={(newValue) => setEditedTime(newValue)}
                            />
                            <button
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md shadow-md transition mt-5"
                                onClick={handleEditSubmit}
                            >
                                Save Changes
                            </button>
                            <button
                                className="mt-2 w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 rounded-md shadow-md transition"
                                onClick={() => setEditRes(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    ) : (
                        reservations.length > 0 ? (
                            reservations.map((reservation) => (
                                <div
                                    key={reservation._id}
                                    className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500 transition hover:shadow-xl ml-10"
                                >
                                    <div className="text-2xl font-semibold text-gray-700 mb-2">{reservation.restaurant.name}</div>
                                    <div className="text-gray-600">Name: {session?.user.name}</div>
                                    <div className="text-gray-600">Date: {reservation.reservationDate}</div>
                                    <div className="text-gray-600">Time: {reservation.reservationTime}</div>

                                    <button
                                        className="mt-4 w-full bg-sky-400 hover:bg-sky-600 text-white font-semibold py-2 rounded-md shadow-md transition"
                                        onClick={() => {
                                            setEditRes(reservation._id);
                                            setEditedDate(reservation.reservationDate);
                                            setEditedTime(dayjs(reservation.reservationTime));
                                        }}
                                    >
                                        Edit Reservation
                                    </button>

                                    <button
                                        className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md shadow-md transition"
                                        onClick={() => {
                                            setCancelRes(reservation._id);
                                            setCancel(true);
                                        }}
                                    >
                                        Cancel Reservation
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-xl text-gray-500 fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 ">No Reservations</div>
                        )
                    )}
                </div>
            </div>
        </LocalizationProvider>
    );
}
