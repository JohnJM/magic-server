import { sign } from "jsonwebtoken";

const createAuthToken = (
    id: string,
    maxAge = 1 * 24 * 60 * 60
): [string, number] => [
        sign({ id }, process.env["JWT_SECRET"] as string, {
            expiresIn: maxAge,
        }),
        maxAge,
    ];

export { createAuthToken };
