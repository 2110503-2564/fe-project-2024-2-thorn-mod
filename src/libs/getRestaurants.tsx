export default async function getRestaurants(){

    await new Promise( (resolve) => setTimeout(resolve,300));
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants`);

    if (!response){
        throw new Error ("fail to fetch resteraunt");
    }

    return response.json();
}