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

const MotpasseOublie = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [inputValue, setInputValue] = useState('');

    const validateInput = (value) => {
        setInputValue(value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[0-9]{7,15}$/;

        if (emailRegex.test(value) || phoneRegex.test(value)) {
            setErrorMessage('');
        } else {
            setErrorMessage('Veuillez entrer un email ou un numéro de téléphone valide.');
        }
    };

    return (
        <div className="page_oublie">
            <div className="left-content">
                <h1 className="h1_oublie">Mot de passe oublié ? Récupérez votre compte ici</h1>
                <div className="container_form_login">
                    <Box component="form" sx={formSx}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Email ou Numéro de téléphone"
                            placeholder="Entrez votre email ou numéro"
                            value={inputValue}
                            onChange={(e) => validateInput(e.target.value)}
                            error={!!errorMessage}
                            helperText={errorMessage}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
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
                        Confirmer
                    </Button>
                </div>
            </div>
            <img src="/img/img_chat_oublie.jpg" alt="Chien" className="right-oublie-image" />
        </div>
    );
};

export default MotpasseOublie;
