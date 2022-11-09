import { UserRole } from '@prisma/client';
import { Router } from 'express';
import { getAuthMiddleware } from '../middlewares/auth';
import { createPost } from '../controllers/post';

const postRoutes = Router();
const requireAuth = getAuthMiddleware([
  UserRole.ADMIN,
  UserRole.SUPERADMIN,
  UserRole.BASIC,
]);

postRoutes.post('/posts/create', [
  requireAuth,
  // ...fileUploadMiddlewares,
  createPost,
]);

export { postRoutes };
