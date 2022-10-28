import { Request, Response } from "express";
import { prisma } from "../../main";

const createThread = async (
    { body: { thread } = {} }: Request,
    res: Response
) => {
    if (!thread) return res.status(500).json({ err: "No thread provided" });
    try {
        const { authorId, subject, content, image } = thread;
        const threads = await prisma.thread.create({
            data: {
                authorId,
                subject,
                content,
                image,
                createdAt: new Date(),
            },
        });
        return res.status(200).json({ threads });
    } catch (err) {
        const { message } = err as Error;
        return res.status(500).json({ error: message });
    }
};

export { createThread };
