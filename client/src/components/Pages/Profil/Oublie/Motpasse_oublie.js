import React, { useState } from 'react';
import './Motpasse_oublie.css';

// Import Material-UI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const formSx = {
    '& .MuiTextField-root': {
        m: 1,
        width: '30ch',
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
};

function MotpasseOublie() {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    const validateInput = (value) => {
        setInputValue(value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(value)) {
            setErrorMessage('');
        } else {
            setErrorMessage('Veuillez entrer un email valide.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        if (!inputValue) {
            setErrorMessage('Veuillez entrer votre email.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputValue)) {
            setErrorMessage('Email invalide.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/password/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: inputValue }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message);
            } else {
                setErrorMessage(data.message || "Une erreur est survenue.");
            }

        } catch (error) {
            setErrorMessage("Erreur serveur.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page_oublie">
            <div className="left-content">
                <h1 className="h1_oublie">Mot de passe oublié ? Récupérez votre compte ici</h1>

                <form onSubmit={handleSubmit} className="container_form_login">
                    <Box component="div" sx={formSx}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Email"
                            placeholder="Entrez votre email"
                            value={inputValue}
                            onChange={(e) => validateInput(e.target.value)}
                            error={!!errorMessage}
                            helperText={errorMessage}
                            disabled={loading}
                        />
                    </Box>

                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        disabled={loading}
                        sx={{
                            backgroundColor: '#778d45',
                            '&:hover': {
                                backgroundColor: '#5f7036',
                            },
                            margin: '0 auto',
                            display: 'block',
                            width: '30ch',
                        }}
                    >
                        {loading ? 'Envoi...' : 'Confirmer'}
                    </Button>

                    {successMessage && (
                        <p style={{ color: 'green', textAlign: 'center', marginTop: '1rem' }}>
                            {successMessage}
                        </p>
                    )}
                </form>
            </div>

            <img src="/img/img_chat_oublie.jpg" alt="Chien" className="right-oublie-image" />
        </div>
    );
}

export default MotpasseOublie;
