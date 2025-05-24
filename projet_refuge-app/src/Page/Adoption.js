import React, { useState } from "react";
import "../Adoption.css";
import emailjs from "emailjs-com";

// Import de Material-UI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { fontSize } from "@mui/system";

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
          setStatusMessage("Erreur lors de l'envoi du message. Veuillez réessayer.");
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
        <form onSubmit={handlesubmit1}>
          <fieldset>
            <legend>Information sur l'animal</legend>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                "& .MuiTextField-root": {
                  m: 2,
                  width: "60ch",
                  fontSize: "1.2rem",
                  // Texte de l'input noir
                  input: {
                    color: "black",
                  },
                  // Label noir par défaut
                  label: {
                    color: "black",
                  },
                  // Quand l'input est focus, label et bordure en #778d45
                  "& label.Mui-focused": {
                    color: "#778d45",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "#778d45",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#778d45",
                    },
                  },
                },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                id="name"
                name="name"
                label="Nom"
                value={formdata1.name}
                onChange={handleChange1}
                onFocus={() => handleFocus1("name")}
                onBlur={() => handleBlur1("name")}
                variant="outlined"
                autoComplete="off"
              />
              <TextField
                required
                id="prenom"
                name="prenom"
                label="Prénom"
                value={formdata1.prenom}
                onChange={handleChange1}
                onFocus={() => handleFocus1("prenom")}
                onBlur={() => handleBlur1("prenom")}
                variant="outlined"
                autoComplete="off"
              />
              <TextField
                required
                id="telephone"
                name="telephone"
                label="Téléphone"
                value={formdata1.telephone}
                onChange={handleChange1}
                onFocus={() => handleFocus1("telephone")}
                onBlur={() => handleBlur1("telephone")}
                variant="outlined"
                autoComplete="off"
              />
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                value={formdata1.email}
                onChange={handleChange1}
                onFocus={() => handleFocus1("email")}
                onBlur={() => handleBlur1("email")}
                variant="outlined"
                autoComplete="off"
              />
              <TextField
                required
                id="message"
                name="message"
                label="Message"
                value={formdata1.message}
                onChange={handleChange1}
                onFocus={() => handleFocus1("message")}
                onBlur={() => handleBlur1("message")}
                variant="outlined"
                multiline
                rows={4}
                autoComplete="off"
              />
            </Box>

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
          </fieldset>

          <fieldset>
            <legend>Information sur l'adoptant</legend>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                "& .MuiTextField-root": {
                  m: 2,
                  width: "60ch",
                  fontSize: "1.2rem",
                  // Texte de l'input noir
                  input: {
                    color: "black",
                  },
                  // Label noir par défaut
                  label: {
                    color: "black",
                  },
                  // Quand l'input est focus, label et bordure en #778d45
                  "& label.Mui-focused": {
                    color: "#778d45",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "#778d45",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#778d45",
                    },
                  },
                },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                type="date"
                id="anniv_adopt"
                name="anniv_adopt"
                label="Date de naissance"
                value={formdata1.anniv_adopt}
                onChange={handleChange1}
                onFocus={() => handleFocus1("anniv_adopt")}
                onBlur={() => handleBlur1("anniv_adopt")}
                required
                fullWidth
                variant="outlined"
              />
              <TextField
                required
                type="text"
                id="adresse"
                name="adresse"
                value={formdata1.adresse}
                onChange={handleChange1}
                onFocus={() => handleFocus1("adresse")}
                onBlur={() => handleBlur1("adresse")}
                variant="outlined"
                label="Adresse"
                autoComplete="off"
                fullWidth
              />
              <TextField
                required
                name="logement"
                value={formdata1.logement}
                onChange={handleChange1}
                onFocus={() => handleFocus1("logement")}
                onBlur={() => handleBlur1("logement")}
                select
                label="Type de logement"
                fullWidth
              >
                <MenuItem value="appartement">Appartement</MenuItem>
                <MenuItem value="maison">Maison</MenuItem>
              </TextField>
              <TextField
                required
                name="acces"
                value={formdata1.acces}
                onChange={handleChange1}
                onFocus={() => handleFocus1("acces")}
                onBlur={() => handleBlur1("acces")}
                select
                label="Accès extérieur"
                fullWidth
              >
                <MenuItem value="jardin">Jardin</MenuItem>
                <MenuItem value="terrasse">Terrasse</MenuItem>
                <MenuItem value="aucun">Aucun</MenuItem>
              </TextField>
              <TextField
                required
                name="enfants"
                value={formdata1.enfants}
                onChange={handleChange1}
                onFocus={() => handleFocus1("enfants")}
                onBlur={() => handleBlur1("enfants")}
                select
                label="Avez-vous des enfants ?"
                fullWidth
              >
                <MenuItem value="oui">Oui</MenuItem>
                <MenuItem value="non">Non</MenuItem>
              </TextField>


              <TextField
                required
                id="infos_form2"
                name="animaux"
                value={formdata1.animaux}
                onChange={handleChange1}
                onFocus={() => handleFocus1("animaux")}
                onBlur={() => handleBlur1("animaux")}
                label="Avez-vous des animaux ?"
                fullWidth
                select
              >
                <MenuItem value="oui">Oui</MenuItem>
                <MenuItem value="non">Non</MenuItem>
              </TextField>
              <TextField
                type="text"
                id="animal2"
                name="animal2"
                value={formdata1.animal2}
                onChange={handleChange1}
                onFocus={() => handleFocus1("animal2")}
                onBlur={() => handleBlur1("animal2")}
                label="Type d'animaux ?"
                variant="outlined"
              />
            </Box>
          </fieldset>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              m: 3,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ backgroundColor: '#778d45', '&:hover': { backgroundColor: '#66753a' } }}
            >
              Envoyer
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Adoption;
