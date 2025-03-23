export default async function getUserProfile(token:string){
    const response = await fetch(`https://thorn-mod.us-east-1.elasticbeanstalk.com/api/v1/auth/me`,{
        method : "GET",
        headers : {
            authorization : `Bearer ${token}`
        }
    });
    if (!response.ok){
        throw new Error ("fail to get me");
    }

    const data = await response.json();
    return data;
}