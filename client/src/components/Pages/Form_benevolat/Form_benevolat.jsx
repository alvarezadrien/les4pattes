// src/components/Pages/FormulaireBenevolat.jsx
import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import "./Form_benevolat.css";

const FormulaireBenevolat = () => {
  const form = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID", // Remplace avec ton ID EmailJS
        "YOUR_TEMPLATE_ID", // Remplace avec ton Template ID
        form.current,
        "YOUR_PUBLIC_KEY" // Remplace avec ta Public Key
      )
      .then(
        () => {
          setIsSubmitted(true);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <section className="benevolat-section">
      <h2 className="form-title">Devenir bénévole</h2>
      <form ref={form} onSubmit={sendEmail} className="benevolat-form">
        <div className="form-group">
          <label>Nom :</label>
          <input type="text" name="nom" required />
        </div>

        <div className="form-group">
          <label>Prénom :</label>
          <input type="text" name="prenom" required />
        </div>

        <div className="form-group">
          <label>Date de naissance :</label>
          <input type="date" name="date_naissance" required />
        </div>

        <div className="form-group">
          <label>Adresse :</label>
          <input type="text" name="adresse" required />
        </div>

        <div className="form-group">
          <label>Téléphone :</label>
          <input type="tel" name="telephone" required />
        </div>

        <div className="form-group">
          <label>Email :</label>
          <input type="email" name="email" required />
        </div>

        <div className="form-group">
          <label>Jours disponibles :</label>
          <div className="checkboxes">
            {[
              "Lundi",
              "Mardi",
              "Mercredi",
              "Jeudi",
              "Vendredi",
              "Samedi",
              "Dimanche",
            ].map((jour) => (
              <label key={jour}>
                <input type="checkbox" name="jours[]" value={jour} />
                {jour}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Créneaux horaires :</label>
          <select name="creneau">
            <option>Matin</option>
            <option>Après-midi</option>
            <option>Soir</option>
          </select>
        </div>

        <div className="form-group">
          <label>Fréquence souhaitée :</label>
          <input type="text" name="frequence" placeholder="ex : 1x/semaine" />
        </div>

        <div className="form-group">
          <label>Compétences :</label>
          <div className="checkboxes">
            {[
              "Promenade de chiens",
              "Nettoyage",
              "Soins de base",
              "Accueil du public",
              "Photographie",
              "Communication",
              "Réseaux sociaux",
              "Bricolage",
            ].map((competence) => (
              <label key={competence}>
                <input
                  type="checkbox"
                  name="competences[]"
                  value={competence}
                />
                {competence}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Expérience ou diplôme lié aux animaux :</label>
          <textarea name="experience" rows="2"></textarea>
        </div>

        <div className="form-group">
          <label>Motivation :</label>
          <textarea name="motivation" rows="3" required></textarea>
        </div>

        <div className="form-group">
          <label>Allergies ou limitations physiques ?</label>
          <textarea name="limitations" rows="2"></textarea>
        </div>

        <div className="form-group">
          <button type="submit" className="submit-btn">
            Envoyer
          </button>
        </div>

        {isSubmitted && (
          <div className="success-message">
            Merci pour votre demande, nous vous contacterons bientôt !
          </div>
        )}
      </form>
    </section>
  );
};

export default FormulaireBenevolat;
