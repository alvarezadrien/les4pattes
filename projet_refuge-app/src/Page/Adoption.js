import React, { useState } from "react";
import "../Adoption.css";
import emailjs from "emailjs-com";

const Adoption = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupClass, setPopupClass] = useState("");

  const [formdata1, setFormData] = useState({
    name: "",
    prenom: "",
    email: "",
    telephone: "",
    animal: "",
    adresse: "",
    anniv_adopt: "",
    logement: "",
    acces: "",
    enfants: "",
    animaux: "",
    animal2: "",
    message: "",
  });

  const [focused, setFocused] = useState({
    name: false,
    prenom: false,
    email: false,
    telephone: false,
    animal: false,
    message: false,
    anniv_adopt: false,
    logement: false,
    acces: false,
    adresse: false,
    enfants: false,
    animaux: false,
    animal2: false,
  });

  const handleChange1 = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formdata1,
      [name]: value,
    });
  };

  const handleFocus1 = (field) => {
    setFocused({
      ...focused,
      [field]: true,
    });
  };

  const handleBlur1 = (field) => {
    if (!formdata1[field]) {
      setFocused({
        ...focused,
        [field]: false,
      });
    }
  };

  const handlesubmit1 = (event) => {
    event.preventDefault();
    const emailParams = { ...formdata1 };

    emailjs
      .send(
        "service_268vdcp",
        "template_q44v26a",
        emailParams,
        "GprZAo7Xbj4DQXKdY"
      )
      .then(
        (result) => {
          console.log("E-mail envoyé !", result.text);
          setStatusMessage("Votre message a bien été envoyé !");
          setPopupClass("success");
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 5000);

          // Réinitialiser le formulaire
          setFormData({
            name: "",
            prenom: "",
            email: "",
            telephone: "",
            animal: "",
            adresse: "",
            anniv_adopt: "",
            logement: "",
            acces: "",
            enfants: "",
            animaux: "",
            animal2: "",
            message: "",
          });
          setFocused({
            name: false,
            prenom: false,
            email: false,
            telephone: false,
            animal: false,
            message: false,
            anniv_adopt: false,
            logement: false,
            acces: false,
            adresse: false,
            enfants: false,
            animaux: false,
            animal2: false,
          });
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

  return (
    <div className="page_adoption">
      {showPopup && (
        <div className={`popup-status ${popupClass}`}>{statusMessage}</div>
      )}
      <h2 className="h2_1">Formulaire d'adoption</h2>
      <div className="formulaire1">
        <fieldset>
          <legend>Information sur l'animal</legend>
          <form onSubmit={handlesubmit1}>
            <div className="input_container_adoption1">
              <input
                type="text"
                id="name"
                name="name"
                value={formdata1.name}
                onChange={handleChange1}
                onFocus={() => handleFocus1("name")}
                onBlur={() => handleBlur1("name")}
                required
              />
              <label
                htmlFor="name"
                className={focused.name || formdata1.name ? "focused" : ""}
              >
                Nom
              </label>
            </div>

            <div className="input_container_adoption1">
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formdata1.prenom}
                onChange={handleChange1}
                onFocus={() => handleFocus1("prenom")}
                onBlur={() => handleBlur1("prenom")}
                required
              />
              <label
                htmlFor="prenom"
                className={focused.prenom || formdata1.prenom ? "focused" : ""}
              >
                Prénom
              </label>
            </div>

            <div className="input_container_adoption1">
              <input
                type="tel"
                id="telephone"
                name="telephone"
                value={formdata1.telephone}
                onChange={handleChange1}
                onFocus={() => handleFocus1("telephone")}
                onBlur={() => handleBlur1("telephone")}
                pattern="^[0-9]{10}$"
                title="Veuillez entrer un numéro de téléphone de 10 chiffres."
                required
              />
              <label
                htmlFor="telephone"
                className={
                  focused.telephone || formdata1.telephone ? "focused" : ""
                }
              >
                Téléphone
              </label>
            </div>

            <div className="input_container_adoption1">
              <input
                type="email"
                id="email"
                name="email"
                value={formdata1.email}
                onChange={handleChange1}
                onFocus={() => handleFocus1("email")}
                onBlur={() => handleBlur1("email")}
                required
              />
              <label
                htmlFor="email"
                className={focused.email || formdata1.email ? "focused" : ""}
              >
                Email
              </label>
            </div>

            <div className="love-group">
              <div className="love">
                <span className="label">Chats</span>
                <input
                  id="switch1"
                  type="radio"
                  name="animal"
                  value="chat"
                  checked={formdata1.animal === "chat"}
                  onChange={handleChange1}
                  onFocus={() => handleFocus1("animal")}
                  onBlur={() => handleBlur1("animal")}
                  required
                />
                <label className="love-heart" htmlFor="switch1">
                  <i className="left"></i>
                  <i className="right"></i>
                  <i className="bottom"></i>
                  <div className="round"></div>
                </label>
              </div>
              <div className="love">
                <span className="label">Chiens</span>
                <input
                  id="switch2"
                  type="radio"
                  name="animal"
                  value="chien"
                  checked={formdata1.animal === "chien"}
                  onChange={handleChange1}
                  onFocus={() => handleFocus1("animal")}
                  onBlur={() => handleBlur1("animal")}
                  required
                />
                <label className="love-heart" htmlFor="switch2">
                  <i className="left"></i>
                  <i className="right"></i>
                  <i className="bottom"></i>
                  <div className="round"></div>
                </label>
              </div>
            </div>

            <div className="input_textarea">
              <label
                htmlFor="message"
                className={
                  focused.message || formdata1.message ? "focused" : ""
                }
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formdata1.message}
                onChange={handleChange1}
                onFocus={() => handleFocus1("message")}
                onBlur={() => handleBlur1("message")}
                required
              />
            </div>
          </form>
        </fieldset>

        <fieldset>
          <legend>Information sur l'adoptant</legend>
          <form onSubmit={handlesubmit1}>
            <div className="input_container_adoption2">
              <input
                type="date"
                id="anniv_adopt"
                name="anniv_adopt"
                value={formdata1.anniv_adopt}
                onChange={handleChange1}
                onFocus={() => handleFocus1("anniv_adopt")}
                onBlur={() => handleBlur1("anniv_adopt")}
                required
              />
              <label
                htmlFor="anniv_adopt"
                className={
                  focused.anniv_adopt || formdata1.anniv_adopt ? "focused" : ""
                }
              >
                Date de naissance
              </label>
            </div>

            <div className="input_container_adoption2">
              <input
                type="text"
                id="adresse"
                name="adresse"
                value={formdata1.adresse}
                onChange={handleChange1}
                onFocus={() => handleFocus1("adresse")}
                onBlur={() => handleBlur1("adresse")}
                required
              />
              <label
                htmlFor="adresse"
                className={
                  focused.adresse || formdata1.adresse ? "focused" : ""
                }
              >
                Adresse
              </label>
            </div>

            <div className="input_container_adoption2">
              <label
                htmlFor="logement"
                className={
                  focused.logement || formdata1.logement ? "focused" : ""
                }
              >
                Type de logement
              </label>
              <select
                id="infos_form2"
                name="logement"
                value={formdata1.logement}
                onChange={handleChange1}
                onFocus={() => handleFocus1("logement")}
                onBlur={() => handleBlur1("logement")}
                required
              >
                <option value="selectionner">Sélectionner</option>
                <option value="appartement">Appartement</option>
                <option value="maison">Maison</option>
              </select>
            </div>

            <div className="input_container_adoption2">
              <label
                htmlFor="acces"
                className={focused.acces || formdata1.acces ? "focused" : ""}
              >
                Accès extérieur
              </label>
              <select
                id="infos_form2"
                name="acces"
                value={formdata1.acces}
                onChange={handleChange1}
                onFocus={() => handleFocus1("acces")}
                onBlur={() => handleBlur1("acces")}
                required
              >
                <option value="selectionner">Sélectionner</option>
                <option value="jardin">Jardin</option>
                <option value="terrasse">Terrasse</option>
                <option value="balcon">Balcon</option>
                <option value="aucun">Aucun</option>
              </select>
            </div>

            <div className="input_container_adoption2">
              <label
                htmlFor="enfants"
                className={
                  focused.enfants || formdata1.enfants ? "focused" : ""
                }
              >
                Avez-vous des enfants ?
              </label>
              <select
                id="infos_form2"
                name="enfants"
                value={formdata1.enfants}
                onChange={handleChange1}
                onFocus={() => handleFocus1("enfants")}
                onBlur={() => handleBlur1("enfants")}
                required
              >
                <option value="selectionner">Sélectionner</option>
                <option value="oui">Oui</option>
                <option value="non">Non</option>
              </select>
            </div>

            <div className="input_container_adoption2">
              <label
                htmlFor="animaux"
                className={
                  focused.animaux || formdata1.animaux ? "focused" : ""
                }
              >
                Avez-vous des animaux ?
              </label>
              <select
                id="infos_form2"
                name="animaux"
                value={formdata1.animaux}
                onChange={handleChange1}
                onFocus={() => handleFocus1("animaux")}
                onBlur={() => handleBlur1("animaux")}
                required
              >
                <option value="selectionner">Sélectionner</option>
                <option value="oui">Oui</option>
                <option value="non">Non</option>
              </select>
            </div>

            <div className="input_container_adoption2">
              <input
                type="text"
                id="animal2"
                name="animal2"
                value={formdata1.animal2}
                onChange={handleChange1}
                onFocus={() => handleFocus1("animal2")}
                onBlur={() => handleBlur1("animal2")}
              />
              <label
                htmlFor="animal2"
                className={
                  focused.animal2 || formdata1.animal2 ? "focused" : ""
                }
              >
                Type animaux ?
              </label>
            </div>

            <button className="button_envoie" type="submit">
              Envoyer
            </button>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default Adoption;
