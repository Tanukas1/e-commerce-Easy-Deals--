const multer = require("multer");
const fs = require("fs");

// Ensure the upload directory exists
const uploadDirectory = "public/uploads";
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save the file with its original name
  },
});

// File filter to validate uploaded file types
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = ["image/webp", "image/jpeg", "image/png", "image/gif"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only JPG, PNG, Webp, and GIF are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
});

module.exports = upload;
