import path from 'path';

const SERVER_PORT = 3001;
const IMG_DIR = 'uploads/images';

const CONSTANTS = {
  SERVER_ONLINE_MSG: `Server running on port ${SERVER_PORT}`,
  SERVER_PORT,
  IMG_DIR,
  FULL_IMG_UPLOAD_PATH: path.join(__dirname, IMG_DIR),
};

const RATE_LIMIT_OPTIONS = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
};

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

export { CONSTANTS, RATE_LIMIT_OPTIONS, MIME_TYPE_MAP };
