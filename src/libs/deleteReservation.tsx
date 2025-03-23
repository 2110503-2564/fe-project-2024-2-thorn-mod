export default async function deleteReservation({ rid, token }: { rid: string; token: string }) {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reservation/${rid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return await response.json(); 
    } catch (error) {
        console.error("Failed to delete reservation:", error);
        throw error; 
    }
}
