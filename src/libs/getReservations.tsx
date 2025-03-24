import { getSession } from "next-auth/react";

export default async function getReservations(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/reservation`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Error ${response.status}: ${errorMessage}`);
  }

  const data = await response.json();

  return data;
}

// export default async function getReservations() {
//   try {
//     // Wait for the session to be available
//     const session = await getSession();

//     // Log the entire session to see its structure
//     console.log("Full session object:", session);

//     // Check if the session exists
//     if (!session) {
//       console.error("No session found");
//       throw new Error("User is not authenticated");
//     }

//     // Access the token - adjust this based on your actual session structure
//     // For a standard next-auth setup, it might be session.accessToken
//     const token = session.user?.token;

//     if (!token) {
//       console.error("No token found in session");
//       throw new Error("Authentication token not found");
//     }

//     console.log("Using token:", token); // Log the token being used (be careful with this in production)

//     const response = await fetch('http://localhost:5000/api/v1/reservation', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     // Check response status
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error(`API error (${response.status}):`, errorText);
//       throw new Error(`Error ${response.status}: ${errorText}`);
//     }

//     const data = await response.json();
//     console.log("Reservation data received:", data);
//     return data;
//   } catch (error) {
//     console.error("Failed to fetch reservations:", error);
//     throw error; // Rethrow to let the calling component handle it
//   }
// }
