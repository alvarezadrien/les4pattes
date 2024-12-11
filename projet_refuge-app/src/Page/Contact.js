import React, { useState } from "react";
import '../Contact.css';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    message: "",
  });

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    telephone: false,
    message: false,
  });

  const [statusMessage, setStatusMessage] = useState(""); // Pour afficher un message de statut

  // Gérer les changements des champs de formulaire
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Gérer la mise en focus sur les champs
  const handleFocus = (field) => {
    setFocused({
      ...focused,
      [field]: true,
    });
  };

  // Gérer la perte de focus des champs
  const handleBlur = (field) => {
    if (!formData[field]) {
      setFocused({
        ...focused,
        [field]: false,
      });
    }
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();

    // Récupérer les données du formulaire
    const { name, email, telephone, message } = formData;

    // Envoi de l'email via EmailJS
    emailjs.send('service_5q958pf', 'template_0wcw1wp', {
      name,
      email,
      telephone,
      message
    }, 'GprZAo7Xbj4DQXKdY')  // Remplace par ta clé publique EmailJS
      .then((result) => {
        console.log('E-mail envoyé !', result.text);
        setStatusMessage("Votre message a bien été envoyé ! ✅");
      }, (error) => {
        console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
        setStatusMessage("Erreur lors de l'envoi du message. Veuillez réessayer. ❌");
      });
  };

  return (
    <div className="container_page_contact">
      {/* L'image de contact */}
      <img className="img_contact" src={process.env.PUBLIC_URL + "/img/chien contact.jpeg"} alt="Chien contact" />

      <div className="container_form">
        <h1 className="h1_contact">Contact</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-container">
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
            <label htmlFor="name" className={focused.name || formData.name ? 'focused' : ''}>Nom</label>
          </div>

          <div className="input-container">
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
            <label htmlFor="email" className={focused.email || formData.email ? 'focused' : ''}>Email</label>
          </div>

          <div className="input-container">
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
            <label htmlFor="telephone" className={focused.telephone || formData.telephone ? 'focused' : ''}>Téléphone</label>
          </div>

          <div className="input-container">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => handleFocus("message")}
              onBlur={() => handleBlur("message")}
              required
            />
            <label htmlFor="message" className={focused.message || formData.message ? 'focused' : ''}>Message</label>
          </div>

          <button className="button_envoyer" type="submit">Envoyer</button>
        </form>

        {/* Affichage du message de statut */}
        {statusMessage && <p className="status-message">{statusMessage}</p>}
      </div>
    </div>
  );
};

export default Contact;
