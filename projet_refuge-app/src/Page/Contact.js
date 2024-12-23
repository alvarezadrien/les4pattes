import React, { useState } from "react";
import '../Contact.css';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [statusMessage, setStatusMessage] = useState(""); // Message de statut
  const [showPopup, setShowPopup] = useState(false); // Contrôle de la pop-up
  const [popupClass, setPopupClass] = useState(""); // Classe pour le style dynamique

  const [formData, setFormData] = useState({
    name1: "",
    email1: "",
    telephone1: "",
    message1: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name1, email1, telephone1, message1 } = formData;

    emailjs
      .send(
        'service_5q958pf',
        'template_0wcw1wp',
        { name1, email1, telephone1, message1 },
        'GprZAo7Xbj4DQXKdY'
      )
      .then(
        (result) => {
          console.log('E-mail envoyé !', result.text);
          setStatusMessage("Votre message a bien été envoyé !");
          setPopupClass("success"); // Classe pour le succès
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 5000); // Disparaît après 5 secondes
        },
        (error) => {
          console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
          setStatusMessage("Erreur lors de l'envoi du message. Veuillez réessayer.");
          setPopupClass("error"); // Classe pour l'erreur
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 5000);
        }
      );
  };

  return (
    <div className="container_page_contact">
      {/* Message de statut en pop-up */}
      {showPopup && (
        <div className={`popup-status ${popupClass}`}>
          {statusMessage}
        </div>
      )}

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
              required
            />
            <label htmlFor="name1">Nom</label>
          </div>

          <div className="input-container">
            <input
              type="email1"
              id="email1"
              name="email1"
              value={formData.email1}
              onChange={handleChange}
              required
            />
            <label htmlFor="email1">Email</label>
          </div>

          <div className="input-container">
            <input
              type="tel"
              id="telephone1"
              name="telephone1"
              value={formData.telephone1}
              onChange={handleChange}
              pattern="^[0-9]{10}$"
              title="Veuillez entrer un numéro de téléphone de 10 chiffres."
              required
            />
            <label htmlFor="telephone1">Téléphone</label>
          </div>

          <div className="input-container">
            <textarea
              id="message1"
              name="message1"
              value={formData.message1}
              onChange={handleChange}
              required
            />
            <label htmlFor="message1">Message</label>
          </div>

          <button className="button_envoyer" type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
