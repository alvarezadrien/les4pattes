import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Adoption.css";
import emailjs from "emailjs-com";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const Adoption = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { animalData } = location.state || {};

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupClass, setPopupClass] = useState("");

  const [formdata1, setFormData] = useState({
    name: "",
    prenom: "",
    email: "",
    telephone: "",
    animal: animalData?.espece === "Chat" ? "Chat" : animalData?.espece === "Chien" ? "Chien" : "",
    animalNom: animalData?.nom || "",
    animalEspece: animalData?.espece || "",
    animalRace: animalData?.race || "",
    animalAge: animalData?.age ? `${animalData.age} ans` : "",
    animalSexe: animalData?.sexe || "",
    animalDescription: animalData?.description || "",
    adresse: "",
    anniv_adopt: "",
    logement: "",
    acces: "",
    enfants: "",
    animaux: "",
    animal2: "",
    experienceAnimaux: "",
    heuresConsacrees: "",
    message: "",
  });

  const [focused, setFocused] = useState({});

  const handleChange1 = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formdata1, [name]: value });
  };

  const handleFocus1 = (field) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur1 = (field) => {
    if (!formdata1[field]) {
      setFocused({ ...focused, [field]: false });
    }
  };

  const handlesubmit1 = (event) => {
    event.preventDefault();
    const emailParams = { ...formdata1 };

    emailjs
      .send("service_268vdcp", "template_q44v26a", emailParams, "GprZAo7Xbj4DQXKdY")
      .then(
        () => {
          setPopupClass("popupenvoie-success");
          setPopupVisible(true);
          setFormData({
            ...formdata1,
            name: "",
            prenom: "",
            email: "",
            telephone: "",
            adresse: "",
            anniv_adopt: "",
            logement: "",
            acces: "",
            enfants: "",
            animaux: "",
            animal2: "",
            experienceAnimaux: "",
            heuresConsacrees: "",
            message: "",
          });
          setFocused({});
        },
        () => {
          setPopupClass("popupenvoie-erreur");
          setPopupVisible(true);
        }
      );
  };

  const inputStyles = (theme) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiTextField-root": {
      m: "16px",
      width: "500px",
      fontSize: "18px",
      input: { color: "black" },
      label: { color: "black" },
      "& label.Mui-focused": { color: "#778d45" },
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "black" },
        "&:hover fieldset": { borderColor: "#778d45" },
        "&.Mui-focused fieldset": { borderColor: "#778d45" },
      },
    },
    [theme.breakpoints.down("md")]: {
      "& .MuiTextField-root": { width: "450px" },
    },
    [theme.breakpoints.down("sm")]: {
      "& .MuiTextField-root": { width: "260px" },
    },
    [theme.breakpoints.down("xs")]: {
      "& .MuiTextField-root": { width: "300px" },
    },
  });

  return (
    <div className="page_adoption">
      {popupVisible && (
        <div className={`popupenvoie ${popupClass}`}>
          <div className="popupenvoie__content">
            <img
              src="/img/fleur_pop.png"
              alt="Image florale"
              className="popupenvoie__image"
            />
            <h2 className="popupenvoie__title">MERCI</h2>
            <p className="popupenvoie__description">
              {popupClass === "popupenvoie-success"
                ? "Nous avons bien reçu votre demande d’adoption."
                : "Erreur lors de l'envoi du message. Veuillez réessayer."}
            </p>
            <div className="popupenvoie__buttons">
              <button
                onClick={() => navigate("/")}
                className="popupenvoie__button retour"
              >
                Retour au menu
              </button>
            </div>
          </div>
        </div>
      )}

      <h2 className="h2_1">Formulaire d'adoption</h2>

      <div className="formulaire1">
        <form onSubmit={handlesubmit1}>
          <fieldset>
            <legend>Informations sur l'animal</legend>
            <Box sx={inputStyles} noValidate autoComplete="off">
              <TextField name="animalNom" label="Nom de l'animal" value={formdata1.animalNom} onChange={handleChange1} />
              <TextField name="animalEspece" label="Espèce" value={formdata1.animalEspece} onChange={handleChange1} />
              <TextField name="animalRace" label="Race" value={formdata1.animalRace} onChange={handleChange1} />
              <TextField name="animalAge" label="Âge" value={formdata1.animalAge} onChange={handleChange1} />
              <TextField name="animalSexe" label="Sexe" value={formdata1.animalSexe} onChange={handleChange1} />
              <TextField name="animalDescription" label="Description" value={formdata1.animalDescription} onChange={handleChange1} multiline rows={4} />
            </Box>

            <div className="love-group">
              <div className="love">
                <span className="label">Chats</span>
                <input
                  id="switch1"
                  type="radio"
                  name="animal"
                  value="Chat"
                  checked={formdata1.animal === "Chat"}
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
                  value="Chien"
                  checked={formdata1.animal === "Chien"}
                  onChange={handleChange1}
                  onFocus={() => handleFocus1("animal")}
                  onBlur={() => handleBlur1("animal")}
                />
                <label className="love-heart" htmlFor="switch2">
                  <i className="left"></i>
                  <i className="right"></i>
                  <i className="bottom"></i>
                  <div className="round"></div>
                </label>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Vos informations</legend>
            <Box sx={inputStyles} noValidate autoComplete="off">
              <TextField name="name" label="Nom" required value={formdata1.name} onChange={handleChange1} />
              <TextField name="prenom" label="Prénom" required value={formdata1.prenom} onChange={handleChange1} />
              <TextField name="email" label="Email" required value={formdata1.email} onChange={handleChange1} />
              <TextField name="telephone" label="Téléphone" required value={formdata1.telephone} onChange={handleChange1} />
              <TextField name="anniv_adopt" type="date" label="Date de naissance" required value={formdata1.anniv_adopt} onChange={handleChange1} InputLabelProps={{ shrink: true }} />
              <TextField name="adresse" label="Adresse" required value={formdata1.adresse} onChange={handleChange1} />
              <TextField name="logement" select label="Type de logement" required value={formdata1.logement} onChange={handleChange1}>
                <MenuItem value="appartement">Appartement</MenuItem>
                <MenuItem value="maison">Maison</MenuItem>
              </TextField>
              <TextField name="acces" select label="Accès extérieur" required value={formdata1.acces} onChange={handleChange1}>
                <MenuItem value="jardin">Jardin</MenuItem>
                <MenuItem value="terrasse">Terrasse</MenuItem>
                <MenuItem value="aucun">Aucun</MenuItem>
              </TextField>
              <TextField name="enfants" select label="Avez-vous des enfants ?" required value={formdata1.enfants} onChange={handleChange1}>
                <MenuItem value="oui">Oui</MenuItem>
                <MenuItem value="non">Non</MenuItem>
              </TextField>
              <TextField name="animaux" select label="Possédez-vous déjà des animaux ?" required value={formdata1.animaux} onChange={handleChange1}>
                <MenuItem value="oui">Oui</MenuItem>
                <MenuItem value="non">Non</MenuItem>
              </TextField>
              <TextField name="animal2" label="Si oui, quels types d'animaux ?" value={formdata1.animal2} onChange={handleChange1} />
              <TextField name="experienceAnimaux" select label="Avez-vous de l'expérience avec les animaux ?" required value={formdata1.experienceAnimaux} onChange={handleChange1}>
                <MenuItem value="oui_beaucoup">Oui, beaucoup</MenuItem>
                <MenuItem value="oui_un_peu">Oui, un peu</MenuItem>
                <MenuItem value="non">Non</MenuItem>
              </TextField>
              <TextField name="heuresConsacrees" select label="Combien d'heures par jour pourriez-vous consacrer à l'animal ?" required value={formdata1.heuresConsacrees} onChange={handleChange1}>
                <MenuItem value="moins_2h">Moins de 2 heures</MenuItem>
                <MenuItem value="2_4h">2 à 4 heures</MenuItem>
                <MenuItem value="4_6h">4 à 6 heures</MenuItem>
                <MenuItem value="plus_6h">Plus de 6 heures</MenuItem>
              </TextField>
              <TextField name="message" label="Pourquoi souhaitez-vous adopter cet animal ? (Message)" required multiline rows={4} value={formdata1.message} onChange={handleChange1} />
            </Box>
          </fieldset>

          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", m: 3 }}>
            <Button type="submit" variant="contained" endIcon={<SendIcon />} sx={{ backgroundColor: "#778d45", "&:hover": { backgroundColor: "#66753a" } }}>
              Envoyer la demande
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Adoption;
