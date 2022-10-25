import { Router } from "express";
import { generateThreads, getHomepageThreads } from "../controllers/thread/thread";

const threadRoutes = Router();
threadRoutes.get("/threads/homepage", getHomepageThreads);
threadRoutes.post("/threads/generate", generateThreads);

export { threadRoutes };
