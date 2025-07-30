const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ✅ Assure que les dossiers existent à l'importation
['uploads', 'uploads/Chats', 'uploads/Chiens'].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Dossier créé automatiquement : ${dir}`);
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const espece = req.body.espece?.toLowerCase();
        const folder = espece === 'chien' ? 'uploads/Chiens' : 'uploads/Chats';

        // ✅ Crée le dossier cible si besoin
        fs.mkdirSync(folder, { recursive: true });
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

module.exports = upload;
