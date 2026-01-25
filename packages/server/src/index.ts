import express from "express";
import { DEFAULTS } from "./config.ts";
import { jobsRouter } from "./jobs/jobs.router.ts";

const PORT = process.env.PORT ?? DEFAULTS.PORT;
const app = express();

app.use(express.json());
app.use("/jobs", jobsRouter);

app.listen(PORT, () => console.log(`Serving: https://localhost:${PORT}`));
