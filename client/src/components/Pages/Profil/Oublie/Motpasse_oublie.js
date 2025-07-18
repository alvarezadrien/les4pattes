import React, { useState } from 'react';
import './Motpasse_oublie.css';
import emailjs from 'emailjs-com';

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
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        if (!email) {
            setMessage('Veuillez entrer votre adresse email.');
            return;
        }

        setLoading(true);

        const resetLink = `https://les4pattes.x75.form.efp.be/ResetPassword/` + Math.random().toString(36).substring(2, 15);

        const templateParams = {
            user_email: email,
            reset_link: resetLink,
        };

        emailjs
            .send('service_kz9t1py', 'template_icjtlos', templateParams, 'u38vBbMZCmg2Jtwor')
            .then(() => {
                setMessage('Un email vous a été envoyé si votre adresse est valide.');
                setLoading(false);
            })
            .catch((error) => {
                console.error('Erreur EmailJS :', error);
                setMessage('Erreur lors de l’envoi de l’email.');
                setLoading(false);
            });
    };

    return (
        <div className="page_oublie">
            <div className="left-content">
                <h1 className="h1_oublie">Mot de passe oublié ?</h1>

                <form onSubmit={sendEmail} className="container_form_login">
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
