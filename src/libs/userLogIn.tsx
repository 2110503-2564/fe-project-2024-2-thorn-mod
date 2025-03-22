export default async function userLogin(userEmail :string,userPassword:string){
    const response = await fetch(`https://localhost:5000/api/v1/auth/login`,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
                email: userEmail ,
                password : userPassword,
        })
    });
    if (!response.ok){
        throw new Error ("failes to fetch cars");
    }

    const data = await response.json();
    return data;
}