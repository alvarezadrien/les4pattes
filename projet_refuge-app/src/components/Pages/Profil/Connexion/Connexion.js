import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Connexion.css';
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

const Connexion = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Erreur de connexion');
        return;
      }

      const user = {
        userId: data.user.id,  // C’est bien user.id qui est renvoyé par le backend
        email: data.user.email,
        nom: data.user.nom,
        prenom: data.user.prenom,
      };

      localStorage.setItem('user', JSON.stringify(user));

      navigate('/Mon compte');
    } catch (err) {
      setError('Erreur réseau');
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
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
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
            <a href="/MotpasseOublie">Mot de passe oublié ?</a>
            <a href="/Inscription">Inscription</a>
          </div>
        </div>
      </div>
      <img src="/img/img_chien_login.jpg" alt="Chien" className="right-image" />
    </div>
  );
};

export default Connexion;
