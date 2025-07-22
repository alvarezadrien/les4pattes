const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

// ✅ ROUTE DE TEST pour Render
router.get('/test', (req, res) => {
    res.json({ message: '✅ La route /api/password/test fonctionne !' });
});

// 📧 Configuration de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// 📩 Étape 1 : Demande de réinitialisation
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Aucun utilisateur avec cet email.' });

        const token = user.generatePasswordResetToken();
        await user.save();

        const resetURL = `${process.env.FRONTEND_URL}/ResetPassword/${token}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Réinitialisation de mot de passe',
            html: `<p>Pour réinitialiser votre mot de passe, cliquez ici : <a href="${resetURL}">${resetURL}</a></p>`
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: 'Email de réinitialisation envoyé.' });
    } catch (error) {
        console.error("Erreur dans /forgot-password :", error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

// 🔐 Étape 2 : Soumission du nouveau mot de passe
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        // Log de debug (à retirer après test)
        console.log("🔍 Token reçu :", token);

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            console.warn("⚠️ Token invalide ou expiré");
            return res.status(400).json({ message: 'Token invalide ou expiré.' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Mot de passe réinitialisé avec succès.' });
    } catch (error) {
        console.error("Erreur dans /reset-password :", error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

module.exports = router;
