import { NextFunction, Response, Request } from "express";
import multer from "multer";
import { CONSTANTS, MIME_TYPE_MAP } from "../constants";
import { Resize } from "./resize";
import { MimeMapLiteral } from "./types";

const { FULL_IMG_UPLOAD_PATH, IMG_DIR } = CONSTANTS;

const fileUpload = multer({
  fileFilter: (_req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype as keyof MimeMapLiteral];
    const error = isValid ? null : new Error("Invalid mime type.");
    if (error) cb(error);
    else cb(null, isValid);
  },
  limits: { fileSize: 500000 },
  storage: multer.diskStorage({
    destination: FULL_IMG_UPLOAD_PATH,
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype as keyof MimeMapLiteral];
      cb(null, `${file.originalname}`);
    },
  }),
});

const getFileUploadMiddlewares = (fieldname: string) => [
  fileUpload.single(fieldname),
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body || !req.file)
      return res
        .status(400)
        .json({
          err: !req.body
            ? "empty body on thread route"
            : "Please provide an image",
        })
        .end();

    try {
      const resized = new Resize(FULL_IMG_UPLOAD_PATH);
      const filename = await resized.save(
        `${FULL_IMG_UPLOAD_PATH}/${req.file.originalname}`
      );
      if (!filename) throw new Error("Failed on thread image save");
      req.body.image = `${IMG_DIR}/${filename}`;
      next();
    } catch (err) {
      const { message } = err as Error;
      res.status(400).json({ error: message });
    }
  },
];

export { fileUpload, getFileUploadMiddlewares };
