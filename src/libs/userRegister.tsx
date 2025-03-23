
export default async function userRegister(userName: string, userEmail: string, userTel: string, userPassword: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        email: userEmail,
        tel: userTel,
        password: userPassword,
      }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to register user.");
    }
  
    const data = await response.json();
  
    return data;
  }
  