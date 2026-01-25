import type { AppType } from "#/index.js";
import { hc } from "hono/client";

export function getClient(baseUrl: string = "http://localhost:3000") {
    return hc<AppType>(baseUrl);
}
