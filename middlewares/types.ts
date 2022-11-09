import { User } from '@prisma/client';
import { Request } from 'express';

interface JwtPayload extends Pick<User, 'id' | 'role'> {}

interface MimeMapLiteral {
  'image/png': 'png';
  'image/jpeg': 'jpeg';
  'image/jpg': 'jpg';
}

export { JwtPayload, MimeMapLiteral };
