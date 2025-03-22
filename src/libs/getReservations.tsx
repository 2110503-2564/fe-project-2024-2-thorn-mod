export default async function getReservations() {
    const response = await fetch(`http://localhost:5000/api/v1/reservation`)

    if (!response){
        throw new Error ("fail to fetch Resevations");
    }

    return response.json();

}