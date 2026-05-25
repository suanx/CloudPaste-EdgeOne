// Minimal Hono app for EdgeOne build test
import { Hono } from "hono";

const app = new Hono();

app.get("/test", (c) => c.text("Test"));

export default app;