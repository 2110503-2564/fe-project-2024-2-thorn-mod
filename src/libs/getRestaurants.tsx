export default async function getRestaurants(){

    await new Promise( (resolve) => setTimeout(resolve,300));
    const response = await fetch('http://localhost:5000/api/v1/restaurants');

    if (!response){
        throw new Error ("fail to fetch resteraunt");
    }

    return response.json();
}