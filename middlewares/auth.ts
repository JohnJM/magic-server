import { Jwt, verify } from "jsonwebtoken";
import { Thread, User, UserRole } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "./types";

const getAuthMiddleware =
    (roles: UserRole[]) =>
        (
            { cookies: { Authorization: token } }: Request,
            res: Response,
            next: NextFunction
        ) => {
            if (!token) return sendUnauthorised(res);
            try {
                const { role } = verify(
                    token,
                    process.env["JWT_SECRET"] as string
                ) as JwtPayload;
                if (!roles.includes(role as UserRole)) return sendUnauthorised(res);
                next();
            } catch {
                return sendUnauthorised(res);
            }
        };

const sendUnauthorised = (res: Response): Response =>
    res.status(403).json({ err: "Unauthorised" }).end();

export { getAuthMiddleware };
