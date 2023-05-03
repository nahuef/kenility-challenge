import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import { MulterError } from "multer";

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, "./images/");
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      const error = new MulterError("LIMIT_UNEXPECTED_FILE");
      error.message = "Only image files are allowed!";
      cb(error);
    }
  },
});

export default upload;
