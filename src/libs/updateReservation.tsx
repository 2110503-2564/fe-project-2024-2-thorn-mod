import { json } from "stream/consumers";
import { UpdateReservationRequest } from "../../interface";

export default async function updateReservation({ reservationID, token,req }: { reservationID: string, token: string, req:UpdateReservationRequest }) {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reservation/${reservationID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },body : JSON.stringify(req)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return await response.json(); 
    } catch (error) {
        console.error("Failed to delete reservation:", error);
        throw error; 
    }
}
