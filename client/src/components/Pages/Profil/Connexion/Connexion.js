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
import Loading from '../../../../components/Widgets/Loading/Loading.jsx';

const Connexion = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        setSuccessMessage('Connexion réussie ! Redirection...');
        setTimeout(() => {
          setIsLoading(false);
          navigate('/Mon compte');
        }, 1500);
      } else {
        setIsLoading(false);
        setError(result.message || 'Identifiants invalides.');
      }
    } catch (err) {
      console.error("Erreur inattendue:", err);
      setIsLoading(false);
      setError("Erreur de connexion. Veuillez réessayer plus tard.");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="connexion-page-wrapper">
      <div className="connexion-main-content">
        <h1 className='connexion-heading'>Connectez-vous pour voir nos coulisses</h1>
        <div className="connexion-form-card">
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                width: '100%',
              }}
            >
              <TextField
                label="Email"
                variant='outlined'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                sx={{
                  maxWidth: '550px', // Increased base size
                  '& .MuiInputLabel-root': {
                    color: 'black',
                    '&.Mui-focused': { color: '#778d45' },
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'black' },
                    '&:hover fieldset': { borderColor: '#778d45' },
                    '&.Mui-focused fieldset': { borderColor: '#778d45' },
                    backgroundColor: 'white',
                  },
                  width: {
                    xs: '15rem',
                    sm: '85%', // Slightly wider on small screens
                    md: '80%', // Slightly wider on medium screens
                    lg: '70%', // Slightly wider on large screens
                    xl: '25rem',
                  }
                }}
              />
              <FormControl
                variant="outlined"
                required
                fullWidth
                sx={{
                  maxWidth: '550px', // Increased base size
                  '& .MuiInputLabel-root': {
                    color: 'black',
                    '&.Mui-focused': { color: '#778d45' },
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'black' },
                    '&:hover fieldset': { borderColor: '#778d45' },
                    '&.Mui-focused fieldset': { borderColor: '#778d45' },
                    backgroundColor: 'white',
                  },
                  width: {
                    xs: '15rem',
                    sm: '85%',
                    md: '80%',
                    lg: '70%',
                    xl: '25rem',
                  }
                }}
              >
                <InputLabel htmlFor="password-input">Mot de passe</InputLabel>
                <OutlinedInput
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
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

            {error && <p className="connexion-message-error">{error}</p>}
            {successMessage && <p className="connexion-message-success">{successMessage}</p>}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: '#778d45',
                  '&:hover': { backgroundColor: '#5f7036' },
                  width: {
                    xs: '90%',
                    sm: '85%',
                    md: '80%',
                    lg: '70%',
                    xl: '60%',
                  },
                  maxWidth: '550px', // Increased base size for button
                  mt: 2,
                }}
              >
                Connexion
              </Button>
            </Box>
          </form>

          <div className="connexion-links-container">
            <Link to="/MotpasseOublie" className="connexion-link-item">Mot de passe oublié ?</Link>
            <Link to="/Inscription" className="connexion-link-item">Inscription</Link>
          </div>
        </div>
      </div>
      <div className="connexion-image-section">
        <img src="/img/img_chien_login.jpg" alt="Chien" className="connexion-responsive-image" />
      </div>
    </div>
  );
};

export default Connexion;