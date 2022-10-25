import { prisma } from "../../../main";
import { compare } from "bcrypt";
import { createAuthToken } from "./createAuthToken";

const getUserData = async ({
    username,
    password,
}: {
    username: string;
    password: string;
}) => {
    const user = await prisma.user.findFirstOrThrow({
        where: {
            username: {
                equals: username,
            },
        },
        take: 1,
    });
    if (!(await compare(password, user.password)))
        throw new Error("Invalid password!");
    return { user, token: createAuthToken(user.id) }
};

export { getUserData };
