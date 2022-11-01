import { Request, Response } from "express";
import { prisma } from "../../main";
import { Thread } from "@prisma/client";

const getHomepageThreads = async (_req: Request, res: Response) => {
    try {
        const homepageThreads = await getThreads(6);
        return res.status(200).json({ homepageThreads });
    } catch (err) {
        const { message } = err as Error;
        return res.status(500).json({ error: message });
    }
};

const getThreads = async (n: number): Promise<Thread[]> => {
    const shuffleArray = (values: string[]) =>
        values[Math.floor(Math.random() * values.length)];

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

export { getHomepageThreads };
