import { PrismaClient } from "@prisma/client";
import express, { Express } from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { CONSTANTS, RATE_LIMIT_OPTIONS } from "./constants";
import { userRoutes } from "./routes/user";

export const prisma = new PrismaClient();
const rateLimiter = rateLimit(RATE_LIMIT_OPTIONS);

const createServer = async () => {
    await prisma.$connect();
    return express();
};
const main = (app: Express) => {
    const { SERVER_ONLINE_MSG, SERVER_PORT, IMG_UPLOAD_PATH } = CONSTANTS;
    app.listen(SERVER_PORT, () => console.log(SERVER_ONLINE_MSG));
    app.use(morgan("dev"));
    app.use("/uploads/images", express.static(IMG_UPLOAD_PATH));
    app.use(express.json());
    app.use(rateLimiter);
    app.use(userRoutes);
};

createServer().then(main).catch(console.error).finally(prisma.$disconnect);
