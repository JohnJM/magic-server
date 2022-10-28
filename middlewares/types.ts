import { User } from "@prisma/client";

interface JwtPayload extends Pick<User, 'role'> { }

export { JwtPayload };
