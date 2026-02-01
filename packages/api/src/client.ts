import { hc } from "hono/client";
import type { AppType } from "#/index.js";

export function getClient(baseUrl: string = "http://localhost:3000") {
	return hc<AppType>(baseUrl);
}
