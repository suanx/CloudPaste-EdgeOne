export async function onRequest(context) {
  return new Response("Hello from EdgeOne!", {
    status: 200,
    headers: { "Content-Type": "text/plain" }
  });
}