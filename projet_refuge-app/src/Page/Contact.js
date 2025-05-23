import React, { useState } from "react";
import "../Contact.css";
import emailjs from "emailjs-com";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';

const Contact = () => {
  const [popupEnvoieVisible, setPopupEnvoieVisible] = useState(false);
  const [popupEnvoieClass, setPopupEnvoieClass] = useState("");

  const [formData, setFormData] = useState({
    name1: "",
    email1: "",
    telephone1: "",
    message1: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Supprimer l'erreur en temps réel si l'utilisateur corrige le champ
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateFields = () => {
    const newErrors = {};

    if (!formData.name1.trim()) newErrors.name1 = "Ce champ est requis.";
    if (!formData.email1.trim()) newErrors.email1 = "Ce champ est requis.";
    if (!formData.telephone1.trim()) {
      newErrors.telephone1 = "Ce champ est requis.";
    } else if (!/^[0-9]{10}$/.test(formData.telephone1)) {
      newErrors.telephone1 = "Numéro invalide (10 chiffres).";
    }
    if (!formData.message1.trim()) newErrors.message1 = "Ce champ est requis.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateFields()) return;

    const { name1, email1, telephone1, message1 } = formData;

    emailjs
      .send(
        "service_5q958pf",
        "template_0wcw1wp",
        { name1, email1, telephone1, message1 },
        "GprZAo7Xbj4DQXKdY"
      )
      .then(
        () => {
          setPopupEnvoieClass("popupenvoie-success");
          setPopupEnvoieVisible(true);
          setFormData({ name1: "", email1: "", telephone1: "", message1: "" });
          setErrors({});
        },
        () => {
          setPopupEnvoieClass("popupenvoie-erreur");
          setPopupEnvoieVisible(true);
        }
      );
  };

  return (
    <div className="container_page_contact">
      {popupEnvoieVisible && (
        <div className={`popupenvoie ${popupEnvoieClass}`}>
          <div className="popupenvoie__content">
            <img
              src="/img/vert_pop.png"
              alt="Image florale"
              className="popupenvoie__image"
            />
            <h2 className="popupenvoie__title">MERCI</h2>
            <p className="popupenvoie__description">
              {popupEnvoieClass === "popupenvoie-success"
                ? "Nous avons bien reçu votre demande de devis..."
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
              '& .MuiTextField-root': {
                m: 1,
                width: '100%',
                maxWidth: '500px',
                display: 'flex',
                margin: '0 auto 1rem auto',
              },
              '& .MuiInputLabel-root': {
                color: 'black',
                '&.Mui-focused': {
                  color: '#778d45',
                },
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'black',
                },
                '&:hover fieldset': {
                  borderColor: '#778d45',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#778d45',
                },
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              name="name1"
              label="Nom"
              value={formData.name1}
              onChange={handleChange}
              error={!!errors.name1}
              helperText={errors.name1 || " "}
              variant="outlined"
            />

            <TextField
              required
              name="email1"
              label="Email"
              type="email"
              value={formData.email1}
              onChange={handleChange}
              error={!!errors.email1}
              helperText={errors.email1 || " "}
              variant="outlined"
            />

            <TextField
              required
              name="telephone1"
              label="Téléphone"
              type="tel"
              value={formData.telephone1}
              onChange={handleChange}
              error={!!errors.telephone1}
              helperText={errors.telephone1 || " "}
              variant="outlined"
            />

            <TextField
              required
              name="message1"
              label="Message"
              multiline
              rows={4}
              value={formData.message1}
              onChange={handleChange}
              error={!!errors.message1}
              helperText={errors.message1 || " "}
              variant="outlined"
            />

            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: '#778d45',
                '&:hover': {
                  backgroundColor: '#5a6b35',
                },
                display: 'flex',
                margin: '1.5rem auto',
                width: '200px',
              }}
            >
              Envoyer
            </Button>
          </Box>
        </div>
        {/* <div className="map_container">
          <LoadScript googleMapsApiKey="AIzaSyAmS3BJbSJHo_FREi_Xn2Hfjror9NvaVxc">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={{ lat: 50.82513, lng: 4.34519 }}
              zoom={10}
            >
              <Marker position={{ lat: 50.82513, lng: 4.34519 }} />
            </GoogleMap>
          </LoadScript>
        </div> */}
      </div>
    </div>
  );
};

export default Contact;
