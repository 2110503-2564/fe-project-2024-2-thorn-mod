import dayjs from "dayjs";
import { RestaurantItem } from "../../interface";
import { useSession } from "next-auth/react";

export default async function makeReserrvation (restaurantID:string,reservationData:JSON){


        const profile = useSession().data?.user

        try {
            const res = await fetch(`http://localhost:5000/api/v1/restaurants/${restaurantID}/reservation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${profile?.token}`, // Pass the token
                },
                body: JSON.stringify(reservationData),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Reservation successful!");
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error booking:", error);
            alert("Something went wrong. Please try again.");
        }
    
};
