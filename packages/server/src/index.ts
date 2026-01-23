import express from "express";
import { Job } from "./types.ts";

const PORT = process.env.PORT ?? 3000;
const app = express();

async function getJobs(): Promise<Job[]> {
    const json = await import("./jobs.json", { with: { type: "json" } });
    const jobs = json.default;
    return jobs;
}

app.use((req, _, next) => {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] ${req.method} ${req.url}`);
    next();
});

app.get("/", (_, res) => {
    res.send({});
});

// Jobs
app.get("/jobs", async (_, res) => {
    res.send(await getJobs());
});

app.get("/job/:id", async (req, res) => {
    const { id } = req.params;
    const idNumber = Number(id);

    const jobs = res.send(await getJobs());
    const item = jobs.filter((value) => value.id == idNumber)[0];

    if (item) {
        res.send(item);
    } else {
        res.sendStatus(404);
    }
});

app.get("/health", (_, res) => {
    return res.json({
        status: "ok",
        uptime: process.uptime(),
    });
});

// Init
app.listen(PORT, () => console.log(`Serving: https://localhost:${PORT}`));
