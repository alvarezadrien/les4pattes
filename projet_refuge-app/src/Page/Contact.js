import React, { useState } from "react";
import '../Contact.css';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [statusMessage, setStatusMessage] = useState(""); // Pour afficher un message de statut

  const [formData, setFormData] = useState({
    name1: "",
    email1: "",
    telephone1: "",
    message1: "",
  });

  const [focused, setFocused] = useState({
    name1: false,
    email1: false,
    telephone1: false,
    message1: false,
  });


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
    const { name1, email1, telephone1, message1 } = formData;

    // Envoi de l'email via EmailJS
    emailjs.send('service_5q958pf', 'template_0wcw1wp', {
      name1,
      email1,
      telephone1,
      message1
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
              id="name1"
              name="name1"
              value={formData.name1}
              onChange={handleChange}
              onFocus={() => handleFocus("name1")}
              onBlur={() => handleBlur("name1")}
              required
            />
            <label htmlFor="name1" className={focused.name1 || formData.name1 ? 'focused' : ''}>Nom</label>
          </div>

          <div className="input-container">
            <input
              type="email1"
              id="email1"
              name="email1"
              value={formData.email1}
              onChange={handleChange}
              onFocus={() => handleFocus("email1")}
              onBlur={() => handleBlur("email1")}
              required
            />
            <label htmlFor="email1" className={focused.email1 || formData.email1 ? 'focused' : ''}>Email</label>
          </div>

          <div className="input-container">
            <input
              type="tel"
              id="telephone1"
              name="telephone1"
              value={formData.telephone1}
              onChange={handleChange}
              onFocus={() => handleFocus("telephone1")}
              onBlur={() => handleBlur("telephone1")}
              pattern="^[0-9]{10}$"
              title="Veuillez entrer un numéro de téléphone de 10 chiffres."
              required
            />
            <label htmlFor="telephone1" className={focused.telephone1 || formData.telephone1 ? 'focused' : ''}>Téléphone</label>
          </div>

          <div className="input-container">
            <textarea
              id="message1"
              name="message1"
              value={formData.message1}
              onChange={handleChange}
              onFocus={() => handleFocus("message1")}
              onBlur={() => handleBlur("message1")}
              required
            />
            <label htmlFor="message1" className={focused.message1 || formData.message1 ? 'focused' : ''}>Message</label>
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