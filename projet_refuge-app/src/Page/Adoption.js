import React, { useState } from 'react';
import '../Adoption.css';

const Adoption = () => {
    const [formData, setFormData] = useState({
        name: "",
        prenom: "",
        email: "",
        telephone: "",
        adresse: "",
    });

    const [focused, setFocused] = useState({
        name: false,
        prenom: false,
        email: false,
        telephone: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    // Gestion des changements de champs
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Gestion du focus des champs
    const handleFocus = (field) => {
        setFocused({
            ...focused,
            [field]: true,
        });
    };

    // Gestion du blur (perte de focus) des champs
    const handleBlur = (field) => {
        if (!formData[field]) {
            setFocused({
                ...focused,
                [field]: false,
            });
        }
    };

    // Afficher ou cacher le mot de passe
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Données soumises:", formData);

        // Réinitialiser le formulaire après soumission
        setFormData({
            name: "",
            prenom: "",
            email: "",
            telephone: "",
            adresse: "",
        });
        setFocused({
            name: false,
            prenom: false,
            email: false,
            telephone: false,
        });
    };

    return (
        <div className='page_adoption'>
            <h2 className='h2_1'>Formulaire d'adoption</h2>

            <div className='formulaire1'>
                <form onSubmit={handleSubmit}>
                    {/* Champ Nom */}
                    <div className="input_container_adoption1">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => handleFocus("name")}
                            onBlur={() => handleBlur("name")}
                            required
                        />
                        <label htmlFor="name" className={focused.name || formData.name ? 'focused' : ''}>
                            Nom
                        </label>
                    </div>

                    {/* Champ Prénom */}
                    <div className="input_container_adoption1">
                        <input
                            type="text"
                            id="prenom"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            onFocus={() => handleFocus("prenom")}
                            onBlur={() => handleBlur("prenom")}
                            required
                        />
                        <label htmlFor="prenom" className={focused.prenom || formData.prenom ? 'focused' : ''}>
                            Prénom
                        </label>
                    </div>

                    {/* Champ Téléphone */}
                    <div className="input_container_adoption1">
                        <input
                            type="tel"
                            id="telephone"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            onFocus={() => handleFocus("telephone")}
                            onBlur={() => handleBlur("telephone")}
                            pattern="^[0-9]{10}$"
                            title="Veuillez entrer un numéro de téléphone de 10 chiffres."
                            required
                        />
                        <label htmlFor="telephone" className={focused.telephone || formData.telephone ? 'focused' : ''}>
                            Téléphone
                        </label>
                    </div>

                    {/* Champ Email */}
                    <div className="input_container_adoption1">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => handleFocus("email")}
                            onBlur={() => handleBlur("email")}
                            required
                        />
                        <label htmlFor="email" className={focused.email || formData.email ? 'focused' : ''}>
                            Email
                        </label>
                    </div>

                    <div className="input_radio_group">
                        <div className="radio_option">
                            <label htmlFor="chien">Chien</label>
                            <input
                                type="radio"
                                id="chien"
                                name="animal"
                                value="chien"
                                required
                            />
                        </div>
                        <div className="radio_option">
                            <label htmlFor="chat">Chat</label>
                            <input
                                type="radio"
                                id="chat"
                                name="animal"
                                value="chat"
                                required
                            />
                        </div>
                    </div>

                    <div className="input_textarea">
                        <label htmlFor="message" className={focused.message || formData.message ? 'focused' : ''}>Message</label>
                        <textarea
                            id="message_adopt1"
                            name="message_area"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => handleFocus("message_area")}
                            onBlur={() => handleBlur("message_area")}
                            required
                        />
                    </div>

                    <div className="input_container_adoption1" id='textarea_adoption1'>
                        <div className="input_conditions">
                            <label htmlFor="terms">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    name="terms"
                                    required
                                />
                                J'accepte les conditions générales
                            </label>
                        </div>
                    </div>

                    <button className="button_enregistrer" type="submit">
                        Enregistrer
                    </button>
                </form>
            </div>

            <h2 className='h2_2'>Formulaire de l'adoptant</h2>

            <div className='formulaire2'>
                <form action="#">
                    <div className='input_container_adoption2'>
                    <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => handleFocus("name")}
                            onBlur={() => handleBlur("name")}
                            required
                        />
                        <label htmlFor="name" className={focused.name || formData.name ? 'focused' : ''}>
                            Nom
                        </label>
                    </div>

                    <div className='input_container_adoption2'>
                    <input
                            type="text"
                            id="prenom"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            onFocus={() => handleFocus("prenom")}
                            onBlur={() => handleBlur("prenom")}
                            required
                        />
                        <label htmlFor="Prénom" className={focused.prenom || formData.prenom ? 'focused' : ''}>
                            Prénom
                        </label>
                    </div>

                    <div className="input_container_adoption2">
                        <input
                            type="date"
                            id="anniv_adopt2"
                            name="anniv_adopt2"
                            required
                        />
                        <label htmlFor="dob">Date de naissance</label>
                    </div>

                    <div className="input_container_adoption2">
                        <input
                            type="tel"
                            id="telephone"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            onFocus={() => handleFocus("telephone")}
                            onBlur={() => handleBlur("telephone")}
                            pattern="^[0-9]{10}$"
                            title="Veuillez entrer un numéro de téléphone de 10 chiffres."
                            required
                        />
                        <label htmlFor="telephone" className={focused.telephone || formData.telephone ? 'focused' : ''}>
                            Téléphone
                        </label>
                    </div>

                    <div className="input_container_adoption2">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => handleFocus("email")}
                            onBlur={() => handleBlur("email")}
                            required
                        />
                        <label htmlFor="email" className={focused.email || formData.email ? 'focused' : ''}>
                            Email
                        </label>
                    </div>

                    <div className="input_container_adoption2">
                        <input
                            type="text"
                            id="adresse"
                            name="adresse"
                            value={formData.adresse}
                            onChange={handleChange}
                            onFocus={() => handleFocus("adresse")}
                            onBlur={() => handleBlur("adresse")}
                            required
                        />
                        <label htmlFor="adresse" className={focused.adresse || formData.adresse ? 'focused' : ''}>
                            Adresse
                        </label>
                    </div>

                    <div className="input_container_adoption2">
                        <label htmlFor="logement">Type de logement</label>
                            <select id="logement" name="logement" required>
                                <option value="">Sélectionner</option>
                                <option value="appartement">Appartement</option>
                                <option value="maison">Maison</option>
                            </select>
                    </div>

                    <div className="input_container_adoption2">
                        <label htmlFor="logement">Accès extérieur</label>
                            <select id="logement" name="acces" required>
                                <option value="">Sélectionner</option>
                                <option value="appartement">Jardin</option>
                                <option value="maison">terrasse</option>
                                <option value="maison">Balcon</option>
                                <option value="maison">Aucun</option>
                            </select>
                    </div>

                    <div className="input_container_adoption2">
                        <label htmlFor="logement">Avez vous des enfants ?</label>
                            <select id="logement" name="enfants" required>
                                <option value="">Sélectionner</option>
                                <option value="appartement">Oui</option>
                                <option value="maison">Non</option>
                            </select>
                    </div>

                    <div className="input_container_adoption2">
                        <label htmlFor="logement">Avez vous des animaux ?</label>
                            <select id="logement" name="animaux" required>
                                <option value="">Sélectionner</option>
                                <option value="appartement">Oui</option>
                                <option value="maison">Non</option>
                            </select>
                    </div>

                    <div className='input_container_adoption2'>
                    <input
                            type="text"
                            id="prenom"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            onFocus={() => handleFocus("prenom")}
                            onBlur={() => handleBlur("prenom")}
                        />
                        <label htmlFor="Prénom" className={focused.prenom || formData.prenom ? 'focused' : ''}>
                            Type animaux ?
                        </label>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Adoption