import multer from "multer";
import path from "path";

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "studentImage") {
      cb(null, "uploads/images/");
    } else if (file.fieldname === "certificates") {
      cb(null, "uploads/certificates/");
    } else {
      cb(null, "uploads/others/");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter to allow only certain file types
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only images and PDFs are allowed"), false);
  }
};

export const upload = multer({ storage, fileFilter });