import { createAuthToken } from "./helper/createAuthToken";
import { hash } from "./helper/hash";
import { prisma } from "../../main";
import { Request, Response } from "express";
import { getUserData } from "./helper/getUserData";

const register = async (
    { body: { username, password, firstName, lastName, email } = {} }: Request,
    res: Response
) => {
    try {
        const userExists = await prisma.user.findFirst({
            where: {
                username: {
                    contains: username,
                },
            },
        });
        if (userExists) throw new Error("Username already exists");

        const user = await prisma.user.create({
            data: {
                username,
                password: await hash(password),
                firstName,
                lastName,
                email,
            },
        });
        const [token, maxAge] = createAuthToken(user);
        res.cookie("Authorization", token, { httpOnly: true, maxAge });
        res.status(200).json({ success: true });
    } catch (err) {
        const { message } = err as Error;
        res.status(400).json({ error: message });
    }
};

const login = async (
    { body: { username, password } = {} }: Request,
    res: Response
) => {
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
        const { message } = err as Error;
        res.status(400).json({ error: message });
    }
};

export { register, login };
