export default async function getReservation(rid:string) {
    const response = await fetch(`http://localhost:5000/api/v1/reservation/${rid}`)

    if (!response){
        throw new Error ("fail to fetch Resevations");
    }

    return response.json();

}