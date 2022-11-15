import { PrismaClient } from "@prisma/client";
import express, { Express } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { CONSTANTS, RATE_LIMIT_OPTIONS } from "./constants";
import { userRoutes } from "./routes/user";
import { threadRoutes } from "./routes/threads";
import bodyParser from "body-parser";
import cors from "cors";

export const prisma = new PrismaClient();
const rateLimiter = rateLimit(RATE_LIMIT_OPTIONS);

const createServer = async () => {
    await prisma.$connect();
    return express();
};
const main = (app: Express) => {
    const { SERVER_ONLINE_MSG, SERVER_PORT, FULL_IMG_UPLOAD_PATH, IMG_DIR } =
        CONSTANTS;
    app.listen(SERVER_PORT, () => console.log(SERVER_ONLINE_MSG));
    app.use(morgan("dev"));
    app.use(cookieParser());
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(`/${IMG_DIR}`, express.static(FULL_IMG_UPLOAD_PATH));
    app.use(rateLimiter);
    app.use(userRoutes);
    app.use(threadRoutes);
};

createServer()
    .then(main)
    .catch(console.error)
    .finally(() => prisma.$disconnect());
