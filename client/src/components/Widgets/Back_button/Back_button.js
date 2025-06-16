import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Back_button.css';
const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button className="back-button" onClick={() => navigate(-1)}>
            ⬅ Retour
        </button>
    );
};

export default BackButton;