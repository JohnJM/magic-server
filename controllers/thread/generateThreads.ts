import { Request, Response } from "express";
import { genSaltSync } from "bcrypt";
import { prisma } from "../../main";

const generateMagicThreads = async (
    { body: { threadCount = 3, authorId } = {} }: Request,
    res: Response
) => {
    if (!authorId) return res.status(500).json({ err: "Provide an authorId" });
    try {
        const threads = await prisma.thread.createMany({
            data: [...Array(threadCount < 10 ? threadCount : 10)].map(() => ({
                authorId: "6356664d3257b4648771f9e8",
                subject: genSaltSync(threadCount),
                content: genSaltSync(threadCount),
                image: "DEFAULT_PATH?",
                createdAt: new Date(),
            })),
        });
        return res.status(200).json({ threads });
    } catch (err) {
        const { message } = err as Error;
        return res.status(500).json({ error: message });
    }
};

export { generateMagicThreads as generateThreads };
