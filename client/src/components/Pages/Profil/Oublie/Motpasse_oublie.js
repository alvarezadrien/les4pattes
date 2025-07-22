import React, { useState } from 'react';
import './Motpasse_oublie.css';
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
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const sendRequest = async (e) => {
        e.preventDefault();

        if (!email) {
            setMessage('Veuillez entrer votre adresse email.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/password/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            setMessage(data.message || 'Si un compte existe, un email a été envoyé.');
        } catch (error) {
            console.error('Erreur lors de la requête :', error);
            setMessage("Une erreur s'est produite.");
        }

        setLoading(false);
    };

    return (
        <div className="page_oublie">
            <div className="left-content">
                <h1 className="h1_oublie">Mot de passe oublié ?</h1>

                <form onSubmit={sendRequest} className="container_form_login">
                    <Box component="div" sx={formSx}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Email"
                            placeholder="Entrez votre email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            '&:hover': { backgroundColor: '#5f7036' },
                            margin: '0 auto',
                            display: 'block',
                            width: '30ch',
                        }}
                    >
                        {loading ? 'Envoi...' : 'Confirmer'}
                    </Button>

                    {message && (
                        <p style={{ textAlign: 'center', marginTop: '1rem' }}>{message}</p>
                    )}
                </form>
            </div>

            <img src="/img/img_chat_oublie.jpg" alt="Chat" className="right-oublie-image" />
        </div>
    );
}

export default MotpasseOublie;
