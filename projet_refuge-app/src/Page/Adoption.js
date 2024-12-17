import React, { useState } from 'react';
import '../Adoption.css';
import emailjs from 'emailjs-com';



const Adoption = () => {
    const [statusMessage, setStatusMessage] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        prenom: "",
        email: "",
        telephone: "",
        animal: "",
        name2: "",
        prenom2: "",
        email2: "",
        telephone2: "",
        adresse: "",
        anniv_adopt: "",
        logement: "",
        acces: "",
        enfants: "",
        animaux: "",
        animal2: ""
    });

    const [focused, setFocused] = useState({
        name: false,
        prenom: false,
        email: false,
        telephone: false,
        name2: false,
        prenom2: false,
        email2: false,
        telephone2: false,
        animal: false,
        message: false,
        anniv_adopt: false,
        logement: false,
        acces: false,
        adresse: false,
        enfants: false,
        animaux: false,
        animal2: false
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

        // Récupérer les données du formulaire
        // const form 1
        const { name, prenom, email, telephone, animal, message, } = formData;
        // const form 2
        const { name2, prenom2, anniv_adopt, telephone2, email2, adresse, logement, acces, enfants, animaux, animal2 } = formData;

        // Envoi de l'email via EmailJS
        emailjs.send('service_268vdcp', 'template_q44v26a', {
            // form 1
            name,
            prenom,
            email,
            telephone,
            animal,
            message,
            // form 2
            name2,
            prenom2,
            telephone2,
            email2,
            anniv_adopt,
            adresse,
            logement,
            acces,
            enfants,
            animaux,
            animal2
        }, 'GprZAo7Xbj4DQXKdY')
            .then((result) => {
                console.log('E-mail envoyé !', result.text);
                setStatusMessage("Votre message a bien été envoyé ! ✅");
            }, (error) => {
                console.log("Erreur lors de l'envoi de l'e-mail:", error);
                setStatusMessage("Erreur lors de l'envoi du message. Veuillez réessayer. ❌");
            });
    };

    return (
        <div className='page_adoption'>
            <h2 className='h2_1'>Formulaire d'adoption</h2>

            <form>

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

                {/* form 2 */}

                <h2 className='h2_2'>Formulaire de l'adoptant</h2>

                <div className='formulaire2'>
                    <form action="#">
                        <div className='input_container_adoption2'>
                            <input
                                type="text"
                                id="name2"
                                name="name2"
                                value={formData.name2}
                                onChange={handleChange}
                                onFocus={() => handleFocus("name2")}
                                onBlur={() => handleBlur("name2")}
                                required
                            />
                            <label htmlFor="name2" className={focused.name2 || formData.name2 ? 'focused' : ''}>
                                Nom
                            </label>
                        </div>

                        <div className='input_container_adoption2'>
                            <input
                                type="text"
                                id="prenom2"
                                name="prenom2"
                                value={formData.prenom2}
                                onChange={handleChange}
                                onFocus={() => handleFocus("prenom2")}
                                onBlur={() => handleBlur("prenom2")}
                                required
                            />
                            <label htmlFor="Prénom2" className={focused.prenom2 || formData.prenom2 ? 'focused' : ''}>
                                Prénom
                            </label>
                        </div>

                        <div className="input_container_adoption2">
                            <input
                                type="date"
                                id="anniv_adopt"
                                name="anniv_adopt"
                                required
                            />
                            <label htmlFor="dob">Date de naissance</label>
                        </div>

                        <div className="input_container_adoption2">
                            <input
                                type="tel"
                                id="telephone2"
                                name="telephone2"
                                value={formData.telephone2}
                                onChange={handleChange}
                                onFocus={() => handleFocus("telephone2")}
                                onBlur={() => handleBlur("telephone2")}
                                pattern="^[0-9]{10}$"
                                title="Veuillez entrer un numéro de téléphone de 10 chiffres."
                                required
                            />
                            <label htmlFor="telephone2" className={focused.telephone2 || formData.telephone2 ? 'focused' : ''}>
                                Téléphone
                            </label>
                        </div>

                        <div className="input_container_adoption2">
                            <input
                                type="email2"
                                id="email2"
                                name="email2"
                                value={formData.email2}
                                onChange={handleChange}
                                onFocus={() => handleFocus("email2")}
                                onBlur={() => handleBlur("email2")}
                                required
                            />
                            <label htmlFor="email2" className={focused.email2 || formData.email2 ? 'focused' : ''}>
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
                                id="animal2"
                                name="animal2"
                                value={formData.animal2}
                                onChange={handleChange}
                                onFocus={() => handleFocus("animal2")}
                                onBlur={() => handleBlur("animal2")}
                            />
                            <label htmlFor="animal2" className={focused.animal2 || formData.animal2 ? 'focused' : ''}>
                                Type animaux ?
                            </label>
                        </div>

                        <button className="button_enregistrer buton_form2" type="submit">
                            Enregistrer
                        </button>

                    </form>
                </div>

                <button className="button_envoie" type="submit">
                    Envoyer
                </button>
                {/* Affichage du message de statut */}
                {statusMessage && <p className="status-message">{statusMessage}</p>}
            </form>

        </div>
    )
}

export default Adoption