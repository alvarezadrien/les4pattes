const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const espece = req.body.espece?.toLowerCase();
        const folder = espece === 'chien' ? 'uploads/Chiens' : 'uploads/Chats';

        fs.mkdirSync(folder, { recursive: true }); // Crée le dossier si pas encore existant
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

module.exports = upload;
