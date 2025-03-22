import ReservationList from "@/components/ReservationList"

export default function MyBooking(){
    return(
        <main className="min-h-screen bg-gray-100 flex flex-col items-center py-20">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Your Reservation</h1>
            <ReservationList />
        </main>
    )
    
}