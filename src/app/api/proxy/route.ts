export async function GET(req: Request) {
    const url = new URL(req.url);
    const backendUrl = `http://thorn-mod.us-east-1.elasticbeanstalk.com${url.search}`;

    const response = await fetch(backendUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: req.headers.get("Authorization") || "", // Forward auth headers if needed
        },
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
    });
}
