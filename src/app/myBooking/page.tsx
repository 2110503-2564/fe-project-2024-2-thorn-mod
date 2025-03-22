"use client";
import { useEffect, useState } from "react";
import ReservationList from "@/components/ReservationList";
import getReservations from "@/libs/getReservations"; // Import the function from lib
import { ReservationItem } from "../../../interface";

// Define a type for reservation data if not imported
type Reservation = ReservationItem; // Replace with your actual Reservation type

export default function MyBooking() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservations(); // Fetch data from the API
        setReservations(data.data);
      } catch (error) {
        setError("Failed to fetch reservations");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("re :>> ", reservations);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center py-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Your Reservation
      </h1>
      <ReservationList reservations={reservations} />
    </main>
  );
}
