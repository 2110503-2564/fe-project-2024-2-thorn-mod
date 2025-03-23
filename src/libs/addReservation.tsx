export default async function addReservation(
  restaurantID: string,
  reservationData: Object,
  token: string
) {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/v1/restaurants/${restaurantID}/reservation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
