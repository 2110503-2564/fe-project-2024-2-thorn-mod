export default async function makeReserrvation (){
    if (restaurant && dayReserve) {
        const reservationData = {
            restaurant,
            reservationTime: dayjs(dayReserve).format("YYYY/MM/DD"),
        };

        try {
            const res = await fetch("http://localhost:5000/api/v1/reservation", {
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
    } else {
        alert("Please select a date and restaurant.");
    }
};
