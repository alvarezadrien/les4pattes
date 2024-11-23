import React, { useState } from 'react';
import '../Motpasse_oublie.css';

const Motpasse_oublie = () => {
    const [errorMessage, setErrorMessage] = useState('');

    const validateInput = (value) => {
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
                <h1>Mot de passe oublié ? Récupérez votre compte ici</h1>
                <div className="container_form_login">
                    <form>
                        <div className="form-group">
                            <label htmlFor="emailOrPhone">Email ou Numéro de téléphone</label>
                            <input
                                type="text"
                                id="emailOrPhone"
                                placeholder="Entrez votre email ou numéro de téléphone"
                                onChange={(e) => validateInput(e.target.value)}
                            />
                            {errorMessage && <span className="error">{errorMessage}</span>}
                        </div>

                        <button type="submit" className="btn-login">Confirmer</button>
                    </form>
                </div>
            </div>
            <img src="/img/img_chat_oublie.jpg" alt="Chien" className="right-image" />
        </div>
    );
};

export default Motpasse_oublie;
