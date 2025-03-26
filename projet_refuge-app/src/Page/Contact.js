import React, { useState } from "react";
import "../Contact.css";
import emailjs from "emailjs-com";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Contact = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupClass, setPopupClass] = useState("");

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
        "service_5q958pf",
        "template_0wcw1wp",
        { name1, email1, telephone1, message1 },
        "GprZAo7Xbj4DQXKdY"
      )
      .then(
        (result) => {
          console.log("E-mail envoyé !", result.text);
          setStatusMessage("Votre message a bien été envoyé !");
          setPopupClass("success");
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 5000);
        },
        (error) => {
          console.log("Erreur lors de l'envoi de l'e-mail:", error);
          setStatusMessage(
            "Erreur lors de l'envoi du message. Veuillez réessayer."
          );
          setPopupClass("error");
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 5000);
        }
      );
  };

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: 50.82513,
    lng: 4.34519,
  };

  return (
    <div className="container_page_contact">
      {showPopup && (
        <div className={`popup-status ${popupClass}`}>{statusMessage}</div>
      )}

      <div className="img_contact">
        <img
          src={process.env.PUBLIC_URL + "/img/chien contact.jpeg"}
          alt="Chien contact"
        />
      </div>

      <div className="div_container_contact">
        <div className="container_form">
          <h1 className="h1_contact">Contactez-nous</h1>

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
                type="email"
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

            <button className="button_envoyer" type="submit">
              Envoyer
            </button>
          </form>
        </div>

        <div className="map_container">
          <LoadScript googleMapsApiKey="AIzaSyAmS3BJbSJHo_FREi_Xn2Hfjror9NvaVxc">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            >
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default Contact;
