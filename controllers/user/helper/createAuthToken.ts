import { UserRole } from "@prisma/client";
import { sign } from "jsonwebtoken";

const createAuthToken = (
    user: {
        id: string;
        role: UserRole;
    },
    maxAge = 1 * 24 * 60 * 60
): [string, number] => [
        sign({ id: user.id, role: user.role }, process.env["JWT_SECRET"] as string, {
            expiresIn: maxAge,
        }),
        maxAge,
    ];

export { createAuthToken };
