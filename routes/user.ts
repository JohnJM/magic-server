import { Router } from "express";
import { register, login } from "../controllers/user/user";

const userRoutes = Router();
userRoutes.post("/user/register", register);
userRoutes.post("/user/login", login);

export { userRoutes };
