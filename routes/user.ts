import { Router } from "express";
import { register } from "../controllers/user";

const userRoutes = Router();
userRoutes.post("/user/register", register);

export { userRoutes };
