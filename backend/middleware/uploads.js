// middleware/upload.js
const { upload } = require("../config/cloudinary");

// Middleware prêt à être utilisé dans tes routes
// Pour un seul fichier : upload.single("image")
// Pour plusieurs fichiers : upload.array("images", 10)

module.exports = upload;
