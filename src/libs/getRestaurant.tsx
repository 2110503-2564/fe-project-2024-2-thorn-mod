export default async function getRestaurant(rid: string){

    await new Promise( (resolve) => setTimeout(resolve,300));
    const response = await fetch(`http://localhost:5000/api/v1/restaurants/${rid}`);

    if (!response){
        throw new Error ("fail to fetch restaurant");
    }

    return response.json();
}