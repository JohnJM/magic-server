import { Request, Response } from 'express';
import { CONSTANTS } from '../../constants';
import { prisma } from '../../main';

const createPost = async (
  { file, body: { post } = {} }: Request,
  res: Response,
) => {
  if (!post) return res.status(500).json({ err: 'No post provided' });
  try {
    const { authorId, threadId, content, options } = post;
    const posts = await prisma.post.create({
      data: {
        authorId,
        content,
        options,
        image: file?.originalname
          ? `${CONSTANTS.IMG_UPLOAD_PATH}/${file.originalname}`
          : 'DEFAULT_PATH?',
        threadId,
      },
    });
    return res.status(200).json({ posts });
  } catch (err) {
    const { message } = err as Error;
    return res.status(500).json({ error: message });
  }
};

export { createPost };
