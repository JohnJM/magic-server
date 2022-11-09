import { Request, Response } from 'express';
import { CONSTANTS } from '../../constants';
import { prisma } from '../../main';

const createThread = async (
  { file, body: { thread } = {} }: Request,
  res: Response,
) => {
  if (!thread) return res.status(500).json({ err: 'No thread provided' });
  try {
    const { authorId, subject, content } = thread;
    const threads = await prisma.thread.create({
      data: {
        authorId,
        subject,
        content,
        image: file?.originalname
          ? `${CONSTANTS.IMG_UPLOAD_PATH}/${file.originalname}`
          : 'DEFAULT_PATH?',
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
