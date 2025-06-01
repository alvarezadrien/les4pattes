import React, { useState } from 'react';
import './Inscription.css';

// Import Material-UI
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
        nom: "",
        prenom: "",
        dateNaissance: "",
        adresse: "",
        telephone: "",
        email: "",
        password: "",
    });

    const [focused, setFocused] = useState({
        nom: false,
        prenom: false,
        email: false,
        telephone: false,
        adresse: false,
        dateNaissance: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFocus = (field) => {
        setFocused({
            ...focused,
            [field]: true,
        });
    };

    const handleBlur = (field) => {
        if (!formData[field]) {
            setFocused({
                ...focused,
                [field]: false,
            });
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccessMessage("Inscription réussie !");
                setFormData({
                    nom: "",
                    prenom: "",
                    dateNaissance: "",
                    adresse: "",
                    telephone: "",
                    email: "",
                    password: "",
                });
            } else {
                setErrorMessage(result.message || "Erreur lors de l'inscription");
            }
        } catch (error) {
            setErrorMessage("Erreur lors de l'inscription, veuillez réessayer.");
        }
    };

    return (
        <div className='container_page_inscription'>
            <h1 className='h1_inscription'>Vos données personnelles</h1>
            <div className='container_form_inscription'>
                <form onSubmit={handleSubmit}>

                    <img src="/img/contact-cat.png" alt="Cat Icon" className="cat_image" />

                    <Box sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: {
                                xs: '90%',
                                sm: '80%',
                                md: '60%',
                                lg: '50ch',
                            },
                            maxWidth: '500px',
                            display: 'flex',
                            margin: '0 auto 1rem auto',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'black',
                            '&.Mui-focused': {
                                color: '#778d45',
                            },
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'black',
                            },
                            '&:hover fieldset': {
                                borderColor: '#778d45',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#778d45',
                            },
                        },
                    }}>

                        <TextField
                            required
                            type="text"
                            id="nom"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            onFocus={() => handleFocus("nom")}
                            onBlur={() => handleBlur("nom")}
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
                            id="dateNaissance"
                            name="dateNaissance"
                            value={formData.dateNaissance}
                            onChange={handleChange}
                            fullWidth
                            variant='outlined'
                            label="Date de naissance"
                            InputLabelProps={{ shrink: true }}
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

                        <FormControl variant="outlined" sx={{
                            m: 1,
                            width: {
                                xs: '90%',
                                sm: '80%',
                                md: '60%',
                                lg: '50ch',
                            },
                            maxWidth: '500px',
                            display: 'flex',
                            margin: '0 auto 1rem auto',
                        }}>
                            <InputLabel htmlFor="password">Mot de passe</InputLabel>
                            <OutlinedInput
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
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

                    {errorMessage && (
                        <div className="error-message">
                            <p>{errorMessage}</p>
                        </div>
                    )}

                    {successMessage && (
                        <div className="success-message" style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>
                            <p>{successMessage}</p>
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
                                    backgroundColor: '#5f7036',
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
