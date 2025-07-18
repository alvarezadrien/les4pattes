const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    dateNaissance: { type: Date, required: true },
    adresse: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "/img/avatar.png" },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
});

// Hash du mot de passe avant enregistrement
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Méthode pour comparer le mot de passe
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Méthode pour générer un token de réinitialisation
userSchema.methods.generatePasswordResetToken = function () {
    const token = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = token;
    this.resetPasswordExpires = Date.now() + 3600000; // 1 heure
    return token;
};

module.exports = mongoose.model('User', userSchema);
