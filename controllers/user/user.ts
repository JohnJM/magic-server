import { createAuthToken } from "./helper/createAuthToken";
import { hash } from "./helper/hash";
import { prisma } from "../../main";
import { Request, Response } from "express";
import { getUserData } from "./helper/getUserData";

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
        const [token, maxAge] = createAuthToken(user);
        res.cookie("Authorization", token, { httpOnly: true, maxAge });
        res.status(200).json({ username: user.username });
    } catch (err) {
        res.status(400).json({ err });
    }
};

const login = async (
    { body: { username, password } = {} }: Request,
    res: Response
) => {
    console.log({ username, password })
    try {
        const {
            user: { username: name },
            token: [token, maxAge],
        } = await getUserData({ username, password });
        res.status(200).cookie("Authorization", token, { maxAge }).json({
            name,
            token,
        });
    } catch (err) {
        console.log({ err })
        res.status(400).json({ err });
    }
};

export { register, login };
