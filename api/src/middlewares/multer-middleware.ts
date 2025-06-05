import multer from "multer";
import path from "path";
import fs from "fs";

// Define o diretório base de uploads
const baseUploadDir = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let subfolder = "other"; // Padrão, caso não seja avatar nem cover

    if (file.fieldname === 'avatar') {
      subfolder = 'avatar';
    } else if (file.fieldname === 'cover') {
      subfolder = 'cover';
    }

    const uploadDir = path.join(baseUploadDir, subfolder);

    // Garante que o diretório exista
    fs.mkdirSync(uploadDir, { recursive: true });

    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },  // Limite de 2MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Formato inválido. Só JPEG, PNG e JPG!"));
    }
  }
});

export default upload;
