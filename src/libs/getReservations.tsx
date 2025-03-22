export default async function getReservations(token:string) {
    const response = await fetch("http://localhost:5000/api/v1/reservation", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // ✅ Send token
        },
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const data = await response.json();

    return data
}
