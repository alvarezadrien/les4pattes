const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

// ✅ ROUTE DE TEST pour Render
router.get('/test', (req, res) => {
    res.json({ message: '✅ La route /api/password/test fonctionne !' });
});

// ✅ Configurer le transporteur avec les variables d’environnement
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ✅ Demande de réinitialisation du mot de passe
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log('❌ Aucun utilisateur avec cet email :', email);
            return res.status(404).json({ message: 'Aucun utilisateur avec cet email.' });
        }

        // Générer un token sécurisé lié à l’utilisateur
        const token = user.generatePasswordResetToken();
        await user.save();

        const resetURL = `${process.env.FRONTEND_URL}/ResetPassword/${token}`;
        console.log('🔑 Token généré :', token);
        console.log('🔗 Réinitialiser l\'URL :', resetURL);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Réinitialisation de mot de passe',
            html: `
                <h2>Réinitialisation de votre mot de passe</h2>
                <p>Bonjour ${user.prenom},</p>
                <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
                <p><a href="${resetURL}">${resetURL}</a></p>
                <p>Ce lien expirera dans 1 heure.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email de réinitialisation envoyé.' });

    } catch (error) {
        console.error('❌ Erreur forgot-password :', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

// ✅ Réinitialisation avec le token
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    console.log('🧪 Token reçu dans l’URL :', token);
    console.log('🔐 Nouveau mot de passe reçu :', newPassword);

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        console.log('👤 Utilisateur trouvé ?', !!user);

        if (!user) {
            return res.status(400).json({ message: 'Token invalide ou expiré.' });
        }

        if (!newPassword || newPassword.trim() === '') {
            return res.status(400).json({ message: 'Mot de passe manquant.' });
        }

        user.password = newPassword; // ✅ sera hashé automatiquement par le hook 'pre save'
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
        console.log('✅ Mot de passe mis à jour avec succès pour :', user.email);

        res.json({ message: 'Mot de passe réinitialisé avec succès.' });

    } catch (error) {
        console.error('❌ Erreur reset-password :', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

module.exports = router;
