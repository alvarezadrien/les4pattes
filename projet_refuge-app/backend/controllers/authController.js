const User = require('../models/User');

exports.signup = async (req, res) => {
    try {
        const { nom, prenom, dateNaissance, adresse, telephone, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Cet email est déjà utilisé.' });

        const newUser = new User({ nom, prenom, dateNaissance, adresse, telephone, email, password });
        await newUser.save();

        res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de l\'inscription', error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé.' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect.' });

        res.status(200).json({ message: 'Connexion réussie.', userId: user._id });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la connexion', error: err.message });
    }
};
