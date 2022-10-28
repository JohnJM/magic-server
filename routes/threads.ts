import { UserRole } from "@prisma/client";
import { Router } from "express";
import {
    createThread,
    getHomepageThreads,
    getThreadsByAuthor,
    generateThreads,
} from "../controllers/thread";
import { } from "../controllers/thread/createThread";
import { getAuthMiddleware } from "../middlewares/auth";

const threadRoutes = Router();
const requireAuth = getAuthMiddleware([UserRole.ADMIN, UserRole.SUPERADMIN]);

threadRoutes.get("/threads/homepage", getHomepageThreads);
threadRoutes.get("/threads/getByAuthor", getThreadsByAuthor);
threadRoutes.post("/threads/generate", [requireAuth, generateThreads]);
threadRoutes.post("/threads/create", [requireAuth, createThread]);

export { threadRoutes };
