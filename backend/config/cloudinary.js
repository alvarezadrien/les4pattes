// config/cloudinary.js
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configuration de Cloudinary avec les variables d'environnement
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Stockage Cloudinary pour multer
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "les4pattes",           // Dossier principal dans ton compte Cloudinary
        allowed_formats: ["jpg", "jpeg", "png", "webp"], // Formats autorisés
        resource_type: "image",         // Type de ressource
    },
});

// Middleware multer pour gérer l'upload
const upload = multer({ storage });

module.exports = { cloudinary, upload };
    