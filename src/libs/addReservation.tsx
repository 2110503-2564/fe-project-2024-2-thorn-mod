<<<<<<< HEAD

=======
>>>>>>> 44847b8 (fix reser adddd)
export default async function addReservation(
  restaurantID: string,
  reservationData: Object,
  token: string
) {
<<<<<<< HEAD

=======
>>>>>>> 44847b8 (fix reser adddd)
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/restaurants/${restaurantID}/reservation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
<<<<<<< HEAD
          Authorization: `Bearer ${token}`,
=======
          Authorization: `Bearer ${token}`, // Use the token passed as parameter
>>>>>>> 44847b8 (fix reser adddd)
        },
        body: JSON.stringify(reservationData),
      }
    );
    const data = await res.json();
    if (res.ok) {
      alert("Reservation successful!");
      return data;
    } else {
      alert("Error: " + data.error);
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("Error booking:", error);
    alert("Something went wrong. Please try again.");
    throw error;
  }
}
