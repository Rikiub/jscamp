import { Router } from "express";
import { JobsController } from "./jobs.controller.ts";

export const jobsRouter = Router();

jobsRouter.get("/", JobsController.getAll);
jobsRouter.get("/:id", JobsController.getById);
jobsRouter.post("/:id", JobsController.create);
jobsRouter.put("/:id", JobsController.update);
jobsRouter.delete("/:id", JobsController.delete);
