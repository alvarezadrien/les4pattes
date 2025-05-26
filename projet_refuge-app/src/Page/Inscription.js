import React, { useState } from 'react';
import '../Inscription.css';

// Import de material-ui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Inscription = () => {
    const [formData, setFormData] = useState({
        name: "",
        prenom: "",
        email: "",
        telephone: "",
        adresse: "",
        dob: "",
        password: "",
    });

    const [focused, setFocused] = useState({
        name: false,
        prenom: false,
        email: false,
        telephone: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // Ajout de l'état pour l'erreur

    // Gestion des changements de champs
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Gestion du focus des champs
    const handleFocus = (field) => {
        setFocused({
            ...focused,
            [field]: true,
        });
    };

    // Gestion du blur (perte de focus) des champs
    const handleBlur = (field) => {
        if (!formData[field]) {
            setFocused({
                ...focused,
                [field]: false,
            });
        }
    };

    // Afficher ou cacher le mot de passe
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();

    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Réinitialiser l'erreur avant l'envoi
        setErrorMessage("");

        try {
            const response = await fetch('/api/inscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                console.log("Données enregistrées:", result);
                // Rediriger l'utilisateur ou afficher un message de succès
                // window.location.href = "/connexion"; ou quelque chose de similaire
            } else {
                console.error("Erreur lors de l'inscription:", result.message);
                // Afficher un message d'erreur si l'email est déjà utilisé
                setErrorMessage(result.message || "Erreur lors de l'inscription");
            }
        } catch (error) {
            console.error("Erreur de connexion:", error);
            setErrorMessage("Erreur lors de l'inscription, veuillez réessayer.");
        }

        // Réinitialiser le formulaire après soumission
        setFormData({
            name: "",
            prenom: "",
            email: "",
            telephone: "",
            adresse: "",
            dob: "",
            password: "",
        });
    };

    return (
        <div className='container_page_inscription'>
            <h1 className='h1_inscription'>Vos données personnelles</h1>
            <div className='container_form_inscription'>
                <form onSubmit={handleSubmit}>
                    <img src="/img/contact-cat.png" alt="Cat Icon" className="cat_image" />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, width: '50ch' }}>
                        <TextField
                            required
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => handleFocus("name")}
                            onBlur={() => handleBlur("name")}
                            variant='outlined'
                            label="Nom"
                        />

                        <TextField
                            required
                            type='text'
                            name='prenom'
                            value={formData.prenom}
                            onChange={handleChange}
                            onFocus={() => handleFocus("prenom")}
                            onBlur={() => handleBlur("prenom")}
                            label="Prénom"
                            variant='outlined'
                        />

                        <TextField
                            required
                            type="date"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            fullWidth
                            variant='outlined'
                            label="Date"
                        />

                        <TextField
                            required
                            type="text"
                            id="adresse"
                            name="adresse"
                            value={formData.adresse}
                            onChange={handleChange}
                            onFocus={() => handleFocus("adresse")}
                            onBlur={() => handleBlur("adresse")}
                            variant='outlined'
                            label="Adresse"
                        />

                        <TextField
                            required
                            type="tel"
                            id="telephone"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            onFocus={() => handleFocus("telephone")}
                            onBlur={() => handleBlur("telephone")}
                            pattern="^[0-9]{10}$"
                            placeholder="Veuillez entrer un numéro de téléphone de 10 chiffres."
                            label="Téléphone"
                            variant='outlined'
                        />

                        <TextField
                            required
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => handleFocus("email")}
                            onBlur={() => handleBlur("email")}
                            label="Email"
                            variant='outlined'
                        />

                        <FormControl variant="outlined">
                            <InputLabel htmlFor="password">Mot de passe</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Entrez votre mot de passe'
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Mot de passe"
                            />
                        </FormControl>
                    </Box>
                    {/* Affichage des messages d'erreur */}
                    {errorMessage && (
                        <div className="error-message">
                            <p>{errorMessage}</p>
                        </div>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button
                            variant="contained"
                            type="submit"
                            className="btn-login"
                            sx={{
                                backgroundColor: '#778d45',
                                '&:hover': {
                                    backgroundColor: '#5f7036', // une teinte plus foncée au survol (optionnel)
                                }
                            }}
                        >
                            Confirmer
                        </Button>
                    </Box>
                </form>
            </div>
        </div>
    );
};

export default Inscription;
