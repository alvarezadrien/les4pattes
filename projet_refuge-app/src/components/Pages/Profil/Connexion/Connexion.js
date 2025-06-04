import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Assure-toi que Link est importé
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

import './Connexion.css';
import { useAuth } from '../../../../context/AuthContext'; // <--- TRÈS IMPORTANT : Vérifie ce chemin !

const Connexion = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Utilisé pour les messages d'erreur
  const [successMessage, setSuccessMessage] = useState(''); // Utilisé pour les messages de succès

  const { login } = useAuth(); // Récupère la fonction login de ton contexte d'authentification
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Réinitialise les erreurs précédentes
    setSuccessMessage(''); // Réinitialise les messages de succès précédents

    try {
      // Utilise la fonction login du contexte d'authentification
      // Elle gère déjà l'appel API et le stockage du token
      const result = await login(email, password);

      if (result.success) {
        setSuccessMessage('Connexion réussie ! Redirection...');
        // Redirige l'utilisateur vers la page protégée après un court délai
        setTimeout(() => {
          navigate('/Mon compte'); // Redirige vers la page "Mon compte"
        }, 1500); // Délai de 1.5 seconde avant la redirection
      } else {
        // Affiche le message d'erreur spécifique renvoyé par le backend ou un message générique
        setError(result.message || 'Échec de la connexion. Veuillez réessayer.');
      }
    } catch (err) {
      console.error("Erreur inattendue lors de la connexion:", err);
      // Gère les erreurs réseau ou autres erreurs non gérées par la réponse du backend
      setError('Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard.');
    }
  };

  return (
    <div className="page_connexion">
      <div className="left-content">
        <h1 className='h1_connexion'>Connectez-vous pour voir nos coulisses</h1>
        <div className="container_form_login_connexion">
          <form onSubmit={handleSubmit}>
            <Box sx={{
              '& .MuiTextField-root': {
                m: 1, width: '30ch', maxWidth: '500px',
                display: 'flex', margin: '0 auto 1rem auto'
              },
              '& .MuiInputLabel-root': {
                color: 'black', '&.Mui-focused': { color: '#778d45' }
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'black' },
                '&:hover fieldset': { borderColor: '#778d45' },
                '&.Mui-focused fieldset': { borderColor: '#778d45' },
              },
            }}>
              <TextField
                id="email"
                label="Email"
                variant='outlined'
                placeholder='Entrez votre email'
                sx={{ mb: 2 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required // Ajouté pour validation HTML5
                aria-label="Email"
              />
              <FormControl
                variant="outlined"
                sx={{
                  m: 1, width: '30ch', maxWidth: '500px',
                  display: 'flex', margin: '0 auto 1rem auto'
                }}
              >
                <InputLabel htmlFor="password">Mot de passe</InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Entrez votre mot de passe'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required // Ajouté pour validation HTML5
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
                  aria-label="Mot de passe"
                />
              </FormControl>
            </Box>
            {/* Affichage des messages d'erreur et de succès */}
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                variant="contained"
                type="submit"
                className="btn-login"
                sx={{
                  backgroundColor: '#778d45',
                  '&:hover': { backgroundColor: '#5f7036' }
                }}
              >
                Connexion
              </Button>
            </Box>
          </form>
          <div className="form-links">
            {/* Utilise Link de react-router-dom pour une navigation SPA */}
            <Link to="/MotpasseOublie">Mot de passe oublié ?</Link>
            <Link to="/Inscription">Inscription</Link>
          </div>
        </div>
      </div>
      <img src="/img/img_chien_login.jpg" alt="Chien" className="right-image" />
    </div>
  );
};

export default Connexion;