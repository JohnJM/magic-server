import { UserRole } from "@prisma/client";
import { Router } from "express";
import { generateThreads, getHomepageThreads } from "../controllers/thread/thread";
import { getAuthMiddleware } from "../middlewares/auth";

const threadRoutes = Router();
const checkAuth = getAuthMiddleware([UserRole.ADMIN, UserRole.SUPERADMIN])

threadRoutes.get("/threads/homepage", getHomepageThreads);
threadRoutes.post("/threads/generate", [checkAuth, generateThreads]);

export { threadRoutes };
