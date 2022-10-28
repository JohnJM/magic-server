import { User } from "@prisma/client";

interface JwtPayload extends Pick<User, 'id' | 'role'> { }

export { JwtPayload };
