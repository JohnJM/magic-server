import { Request, Response } from 'express';
import { CONSTANTS } from '../../constants';
import { prisma } from '../../main';

const createThread = async (
  { body }: Request,
  res: Response,
) => {
  if (!body) return res.status(500).json({ err: 'No thread provided' });
  try {
    const { authorId, subject, content, image } = body;
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
