import { createAuthToken } from "../helper/createAuthToken";
import { hash } from "../helper/hash";
import { prisma } from "../main";
import { Request, Response } from "express";

const register = async (
    { body: { username, password } = {} }: Request,
    res: Response
) => {
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: await hash(password),
            },
        });
        const [token, maxAge] = createAuthToken(user.id);
        res.cookie("Authorization", token, { httpOnly: true, maxAge });
        res.status(200).json({ username: user.username });
    } catch (err) {
        res.status(400).json({ err });
    }
};

export { register };
