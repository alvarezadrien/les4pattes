import React, { useState } from 'react';
import './Inscription.css';
import Loading from '../../../Widgets/Loading/Loading.jsx';

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
        adresse: {
            rue: "",
            ville: "",
            codePostal: "",
            pays: ""
        },
        telephone: "",
        email: "",
        password: "",
    });

    const [focused, setFocused] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (["rue", "ville", "codePostal", "pays"].includes(name)) {
            setFormData(prev => ({
                ...prev,
                adresse: {
                    ...prev.adresse,
                    [name]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFocus = (field) => {
        setFocused(prev => ({ ...prev, [field]: true }));
    };

    const handleBlur = (field) => {
        const value = ["rue", "ville", "codePostal", "pays"].includes(field)
            ? formData.adresse[field]
            : formData[field];
        if (!value) {
            setFocused(prev => ({ ...prev, [field]: false }));
        }
    };

    const handleClickShowPassword = () => setShowPassword(show => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccessMessage("Inscription réussie !");
                setFormData({
                    nom: "",
                    prenom: "",
                    dateNaissance: "",
                    adresse: {
                        rue: "",
                        ville: "",
                        codePostal: "",
                        pays: ""
                    },
                    telephone: "",
                    email: "",
                    password: "",
                });
            } else {
                setErrorMessage(result.message || "Erreur lors de l'inscription");
            }
        } catch (error) {
            setErrorMessage("Erreur lors de l'inscription, veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container_page_inscription'>
            <h1 className='h1_inscription'>Vos données personnelles</h1>

            {loading ? (
                <Loading />
            ) : (
                <div className='container_form_inscription'>
                    <form onSubmit={handleSubmit}>
                        <img src="/img/contact-cat.png" alt="Cat Icon" className="cat_image" />

                        <Box
                            sx={{
                                '& .MuiTextField-root, & .MuiFormControl-root': {
                                    width: '400px',
                                    maxWidth: '90%',
                                    display: 'flex',
                                    margin: '0 auto 1rem auto',
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'black',
                                    '&.Mui-focused': { color: '#778d45' },
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'black' },
                                    '&:hover fieldset': { borderColor: '#778d45' },
                                    '&.Mui-focused fieldset': { borderColor: '#778d45' },
                                },
                                '@media (max-width: 480px)': {
                                    '& .MuiTextField-root, & .MuiFormControl-root': {
                                        width: '90vw',
                                    },
                                },
                            }}
                        >
                            <TextField required name="nom" value={formData.nom}
                                onChange={handleChange} onFocus={() => handleFocus("nom")} onBlur={() => handleBlur("nom")}
                                label="Nom" variant='outlined' />

                            <TextField required name="prenom" value={formData.prenom}
                                onChange={handleChange} onFocus={() => handleFocus("prenom")} onBlur={() => handleBlur("prenom")}
                                label="Prénom" variant='outlined' />

                            <TextField required type="date" name="dateNaissance" value={formData.dateNaissance}
                                onChange={handleChange} label="Date de naissance"
                                InputLabelProps={{ shrink: true }} variant='outlined' />

                            <TextField required name="rue" value={formData.adresse.rue}
                                onChange={handleChange} onFocus={() => handleFocus("rue")} onBlur={() => handleBlur("rue")}
                                label="Rue" variant='outlined' />

                            <TextField required name="ville" value={formData.adresse.ville}
                                onChange={handleChange} onFocus={() => handleFocus("ville")} onBlur={() => handleBlur("ville")}
                                label="Ville" variant='outlined' />

                            <TextField required name="codePostal" value={formData.adresse.codePostal}
                                onChange={handleChange} onFocus={() => handleFocus("codePostal")} onBlur={() => handleBlur("codePostal")}
                                label="Code postal" variant='outlined' />

                            <TextField required name="pays" value={formData.adresse.pays}
                                onChange={handleChange} onFocus={() => handleFocus("pays")} onBlur={() => handleBlur("pays")}
                                label="Pays" variant='outlined' />

                            <TextField required type="tel" name="telephone" value={formData.telephone}
                                onChange={handleChange} onFocus={() => handleFocus("telephone")} onBlur={() => handleBlur("telephone")}
                                pattern="^[0-9]{10}$" placeholder="Numéro de téléphone 10 chiffres"
                                label="Téléphone" variant='outlined' />

                            <TextField required type="email" name="email" value={formData.email}
                                onChange={handleChange} onFocus={() => handleFocus("email")} onBlur={() => handleBlur("email")}
                                label="Email" variant='outlined' />

                            <FormControl variant="outlined">
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
                                            <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
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
                                    '&:hover': { backgroundColor: '#5f7036' },
                                }}
                            >
                                Confirmer
                            </Button>
                        </Box>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Inscription;
