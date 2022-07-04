import { parse } from "https://deno.land/std/flags/mod.ts";
import { app } from "./app.ts";

// if running locally
const DEFAULT_PORT = 8000;

// get host's (Heoku's) predetermined port
const argPort = parse(Deno.args).port;

await app.listen({ port: argPort || DEFAULT_PORT });
