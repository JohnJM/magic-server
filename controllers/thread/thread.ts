import { Request, Response } from "express";
import { genSaltSync } from "bcrypt";
import { prisma } from "../../main";
import { Thread } from "@prisma/client";

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
        res.status(500).json({ err });
    }
};

const getHomepageThreads = async (_req: Request, res: Response) => {
    try {
        const homepageThreads = await getThreads(6);
        return res.status(200).json({ homepageThreads });
    } catch (err) {
        console.log({ err });
        return res.status(500);
    }
};

const getThreads = async (n: number): Promise<Thread[]> => {
    const shuffleArray = (values: string[]) => {
        const index = Math.floor(Math.random() * values.length);
        return values[index];
    };
    const orderBy = shuffleArray(["id", "authorId", "content"]);
    const orderDir = shuffleArray(["asc", "desc"]);
    const skip = Math.max(
        0,
        Math.floor(Math.random() * (await prisma.thread.count())) - n
    );

    return prisma.thread.findMany({
        take: n,
        skip,
        orderBy: { [orderBy]: orderDir },
    });
};

export { generateMagicThreads as generateThreads, getHomepageThreads };
