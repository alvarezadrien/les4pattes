import React, { useState } from 'react';
import '../Connexion.css';

// Import de material-ui
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

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <>
      <div className="page_connexion">
        <div className="left-content">
          <h1 className='h1_connexion'>Connectez-vous pour voir nos coulisses</h1>
          <div className="container_form_login_connexion">
            <form>

              <Box sx={{ display: 'flex', flexDirection: 'column', width: '40ch', margin: '0 auto', marginTop: '20px', m: 1 }}>
                <TextField
                  id="email"
                  label="Email"
                  variant='outlined'
                  placeholder='Entrez votre email'
                  sx={{ mb: 2 }}
                />
                <FormControl variant="outlined">
                  <InputLabel htmlFor="password">Mot de passe</InputLabel>
                  <OutlinedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
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
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                  variant="contained"
                  type="submit"
                  className="btn-login"
                  sx={{
                    backgroundColor: '#778d45',
                    '&:hover': {
                      backgroundColor: '#5f7036', // une teinte plus foncée au survol (optionnel)
                    }
                  }}
                >
                  Connexion
                </Button>
              </Box>

            </form>
            <div className="form-links">
              <a href="/Mot de passe oublié">Mot de passe oublié ?</a>
              <a href="/Inscription">Inscription</a>
            </div>
          </div>
        </div>
        <img src="/img/img_chien_login.jpg" alt="Chien" className="right-image" />
      </div>
    </>
  );
};

export default Connexion;
