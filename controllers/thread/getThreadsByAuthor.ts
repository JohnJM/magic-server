import { Request, Response } from "express";
import { prisma } from "../../main";

const getThreadsByAuthor = async (
    { body: { authorId } = {} }: Request,
    res: Response
) => {
    try {
        const threads = await prisma.thread.findMany({
            where: {
                authorId: {
                    equals: authorId,
                },
            },
        });
        return res.status(200).json({ threads });
    } catch (err) {
        const { message } = err as Error;
        return res.status(500).json({ error: message });
    }
};

export { getThreadsByAuthor };
