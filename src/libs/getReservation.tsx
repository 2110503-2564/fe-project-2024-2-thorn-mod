export default async function getReservation(rid:string) {
    const response = await fetch(`http://thorn-mod.us-east-1.elasticbeanstalk.com/api/v1/reservation/${rid}`)

    if (!response){
        throw new Error ("fail to fetch Resevations");
    }

    return response.json();

}