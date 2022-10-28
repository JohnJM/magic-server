import { User, UserRole } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { JwtPayload } from "../../../middlewares/types";

const createAuthToken = (
    { id, role }: JwtPayload,
    maxAge = 1 * 24 * 60 * 60
): [string, number] => [
        sign({ id, role }, process.env["JWT_SECRET"] as string, {
            expiresIn: maxAge,
        }),
        maxAge,
    ];

export { createAuthToken };
