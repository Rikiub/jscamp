import express from "express";
import { DEFAULTS } from "./config.ts";
import { JobsRouter } from "./jobs/index.ts";
import { corsMiddleware } from "./middlewares/cors.ts";

const PORT = process.env.PORT ?? DEFAULTS.PORT;
const app = express();

app.use(corsMiddleware(), express.json());

app.use("/api/jobs", JobsRouter);

app.listen(PORT, () => console.log(`Serving: https://localhost:${PORT}`));
