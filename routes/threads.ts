import { UserRole } from "@prisma/client";
import { Router } from "express";
import {
  createThread,
  getHomepageThreads,
  getThreadsByAuthor,
  generateThreads,
} from "../controllers/thread";
import { getAuthMiddleware } from "../middlewares/auth";
import { getFileUploadMiddlewares } from "../middlewares/fileUpload";

const threadRoutes = Router();
const requireAuth = getAuthMiddleware([
  UserRole.ADMIN,
  UserRole.SUPERADMIN,
  UserRole.BASIC,
]);
const fileUploadMiddlewares = getFileUploadMiddlewares("image");

threadRoutes.get("/threads/homepage", getHomepageThreads);
threadRoutes.get("/threads/getByAuthor", getThreadsByAuthor);
threadRoutes.post("/threads/generate", [requireAuth, generateThreads]);
threadRoutes.post("/threads/create", [
  // requireAuth,
  ...fileUploadMiddlewares,
  createThread,
]);

export { threadRoutes };
