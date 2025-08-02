// src/components/Pages/Contact.jsx
import React, { useState } from "react";
import "./Contact.css";
import emailjs from "emailjs-com";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const Contact = () => {
  const [popupEnvoieVisible, setPopupEnvoieVisible] = useState(false);
  const [popupEnvoieClass, setPopupEnvoieClass] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    reason: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, phone, message, reason } = formData;

    if (!name || !email || !phone || !message) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    emailjs
      .send(
        "service_5q958pf",
        "template_0wcw1wp",
        {
          name,
          email,
          phone,
          message,
          reason,
        },
        "GprZAo7Xbj4DQXKdY"
      )
      .then(() => {
        setPopupEnvoieClass("popupenvoie-success");
        setPopupEnvoieVisible(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          reason: "",
        });
      })
      .catch(() => {
        setPopupEnvoieClass("popupenvoie-erreur");
        setPopupEnvoieVisible(true);
      });
  };

  return (
    <div className="container_page_contact">
      {popupEnvoieVisible && (
        <div className={`popupenvoie ${popupEnvoieClass}`}>
          <div className="popupenvoie__content">
            <img
              src="/img/fleur_pop.png"
              alt="Image florale"
              className="popupenvoie__image"
            />
            <h2 className="popupenvoie__title">MERCI</h2>
            <p className="popupenvoie__description">
              {popupEnvoieClass === "popupenvoie-success"
                ? "Nous avons bien reçu votre demande."
                : "Erreur lors de l'envoi du message. Veuillez réessayer."}
            </p>
            <div className="popupenvoie__buttons">
              <button
                onClick={() => (window.location.href = "/")}
                className="popupenvoie__button retour"
              >
                Retour au menu
              </button>
            </div>
          </div>
        </div>
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

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "100%",
                maxWidth: "500px",
                display: "flex",
                margin: "0 auto 1rem auto",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField name="name" label="Nom complet" value={formData.name} onChange={handleChange} required />
            <TextField name="email" label="Adresse email" value={formData.email} onChange={handleChange} required />
            <TextField name="phone" label="Téléphone" value={formData.phone} onChange={handleChange} required />
            <TextField
              name="message"
              label="Votre message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              className="button_envoyer"
              variant="contained"
              endIcon={<SendIcon />}
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: "#778d45",
                "&:hover": { backgroundColor: "#5a6b35" },
                margin: "1.5rem auto",
                width: "200px",
              }}
            >
              Envoyer
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Contact;
