// ✅ Connexion.jsx mis à jour pour Render
// Assure-toi que useAuth() utilise bien l'instance axios à jour

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
import { useAuth } from '../../../../context/AuthContext';

const Connexion = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const result = await login(email, password);

      if (result.success) {
        setSuccessMessage('Connexion réussie ! Redirection...');
        setTimeout(() => {
          navigate('/Mon compte');
        }, 1500);
      } else {
        setError(result.message || 'Identifiants invalides.');
      }
    } catch (err) {
      console.error("Erreur inattendue:", err);
      setError("Erreur de connexion. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="page_connexion">
      <div className="left-content">
        <h1 className='h1_connexion'>Connectez-vous pour voir nos coulisses</h1>
        <div className="container_form_login_connexion">
          <form onSubmit={handleSubmit}>
            <Box sx={{ '& .MuiTextField-root': { m: 1, width: '30ch', display: 'flex', margin: '0 auto 1rem auto' } }}>
              <TextField
                label="Email"
                variant='outlined'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FormControl variant="outlined" sx={{ m: 1, width: '30ch', margin: '0 auto 1rem auto' }}>
                <InputLabel htmlFor="password">Mot de passe</InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Mot de passe"
                />
              </FormControl>
            </Box>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button variant="contained" type="submit" sx={{ backgroundColor: '#778d45', '&:hover': { backgroundColor: '#5f7036' } }}>
                Connexion
              </Button>
            </Box>
          </form>
          <div className="form-links">
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