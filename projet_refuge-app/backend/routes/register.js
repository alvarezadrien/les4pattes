router.post('/inscription', async (req, res) => {  // Change to match frontend
    try {
        const { name, prenom, email, telephone, adresse, dob, password } = req.body;

        // Vérifie si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        // Hashage du mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Création du nouvel utilisateur
        const newUser = new User({
            name,
            prenom,
            email,
            telephone,
            adresse,
            dob,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès !', user: newUser });
    } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});
