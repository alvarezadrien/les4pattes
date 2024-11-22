import React, { useState } from 'react';
import '../Connexion.css';

const Connexion = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="page_connexion">
      <div className="left-content">
        <h1>Connectez-vous pour voir nos coulisses</h1>
        <div className="container_form_login">
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Entrez votre email" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe :</label>
              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Entrez votre mot de passe"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <img src="/img/affiche.png" alt="" width={25} /> : <img src="/img/cacher.png" alt="" width={25} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-login">Se connecter</button>
          </form>
          <div className="form-links">
            <a href="/Mot de passe oublié">Mot de passe oublié ?</a>
            <a href="/Inscription">Inscription</a>
          </div>
        </div>
      </div>
      <img src="/img/img_chien_login.jpg" alt="Chien" className="right-image" />
    </div>
  );
};

export default Connexion;
