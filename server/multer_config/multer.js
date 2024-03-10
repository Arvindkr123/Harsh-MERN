import multer from "multer";
import fs from "fs";
import path from "path";

// storage config
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadFolder = "./uploads";
    // Create the destination folder if it doesn't exist
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }
    callback(null, uploadFolder);
  },
  filename: (req, file, callback) => {
    const fileName = `image-${Date.now()}${path.extname(file.originalname)}`;
    callback(null, fileName);
  },
});

const Filefilter = (req, file, callback) => {
  const allowedMimeTypes = ["image/jpg", "image/png", "image/jpeg"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    const error = new Error("Only png, jpg, and jpeg files formats are supported");
    callback(error);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: Filefilter,
});
