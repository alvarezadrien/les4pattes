import React, { useState } from "react";
import "./Adoption.css";
import emailjs from "emailjs-com";

// Import de Material-UI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
// fontSize est importé mais non utilisé directement, je le laisse si vous en avez l'usage ailleurs
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
    // Valeurs par défaut pour les infos de l'animal
    animal: "", // sera défini par les radios (chat/chien)
    animalNom: "Buddy", // Exemple : Nom de l'animal
    animalEspece: "Chien", // Exemple : Espèce de l'animal
    animalRace: "Labrador", // Exemple : Race de l'animal
    animalAge: "2 ans", // Exemple : Âge de l'animal
    animalSexe: "Mâle", // Exemple : Sexe de l'animal
    animalDescription:
      "Buddy est un labrador affectueux et joueur. Il aime les longues promenades et s'entend bien avec les enfants.", // Exemple : Description de l'animal
    adresse: "",
    anniv_adopt: "",
    logement: "",
    acces: "",
    enfants: "",
    animaux: "",
    animal2: "",
    experienceAnimaux: "", // Nouveau champ
    heuresConsacrees: "", // Nouveau champ
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
    experienceAnimaux: false, // Nouveau champ
    heuresConsacrees: false, // Nouveau champ
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
            animalNom: "Buddy", // Garder les exemples d'infos animal ou les réinitialiser si besoin
            animalEspece: "Chien",
            animalRace: "Labrador",
            animalAge: "2 ans",
            animalSexe: "Mâle",
            animalDescription:
              "Buddy est un labrador affectueux et joueur. Il aime les longues promenades et s'entend bien avec les enfants.",
            adresse: "",
            anniv_adopt: "",
            logement: "",
            acces: "",
            enfants: "",
            animaux: "",
            animal2: "",
            experienceAnimaux: "", // Réinitialiser
            heuresConsacrees: "", // Réinitialiser
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
            experienceAnimaux: false, // Réinitialiser
            heuresConsacrees: false, // Réinitialiser
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
        <form onSubmit={handlesubmit1}>
          <fieldset>
            <legend>Informations sur l'animal</legend>
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
                  input: {
                    color: "black",
                  },
                  label: {
                    color: "black",
                  },
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
              {/* Informations de l'animal - Exemples prédéfinis */}
              <TextField
                id="animalNom"
                name="animalNom"
                label="Nom de l'animal"
                value={formdata1.animalNom}
                InputProps={{
                  readOnly: true, // Rendre le champ non modifiable
                }}
                variant="outlined"
              />
              <TextField
                id="animalEspece"
                name="animalEspece"
                label="Espèce"
                value={formdata1.animalEspece}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
              <TextField
                id="animalRace"
                name="animalRace"
                label="Race"
                value={formdata1.animalRace}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
              <TextField
                id="animalAge"
                name="animalAge"
                label="Âge"
                value={formdata1.animalAge}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
              <TextField
                id="animalSexe"
                name="animalSexe"
                label="Sexe"
                value={formdata1.animalSexe}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
              <TextField
                id="animalDescription"
                name="animalDescription"
                label="Description"
                value={formdata1.animalDescription}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                multiline
                rows={4}
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
            <legend>Vos informations</legend>
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
                  input: {
                    color: "black",
                  },
                  label: {
                    color: "black",
                  },
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
                InputLabelProps={{
                  shrink: true, // Permet au label de ne pas chevaucher la valeur
                }}
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
                label="Possédez-vous déjà des animaux ?"
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
                label="Si oui, quels types d'animaux ?"
                variant="outlined"
              // Ce champ n'est pas "required" car il dépend de la réponse précédente
              />

              {/* Nouveau champ: Expérience avec les animaux */}
              <TextField
                required
                name="experienceAnimaux"
                value={formdata1.experienceAnimaux}
                onChange={handleChange1}
                onFocus={() => handleFocus1("experienceAnimaux")}
                onBlur={() => handleBlur1("experienceAnimaux")}
                select
                label="Avez-vous de l'expérience avec les animaux ?"
                fullWidth
              >
                <MenuItem value="oui_beaucoup">Oui, beaucoup</MenuItem>
                <MenuItem value="oui_un_peu">Oui, un peu</MenuItem>
                <MenuItem value="non">Non</MenuItem>
              </TextField>

              {/* Nouveau champ: Heures consacrées à l'animal */}
              <TextField
                required
                name="heuresConsacrees"
                value={formdata1.heuresConsacrees}
                onChange={handleChange1}
                onFocus={() => handleFocus1("heuresConsacrees")}
                onBlur={() => handleBlur1("heuresConsacrees")}
                select
                label="Combien d'heures par jour pourriez-vous consacrer à l'animal ?"
                fullWidth
              >
                <MenuItem value="moins_2h">Moins de 2 heures</MenuItem>
                <MenuItem value="2_4h">2 à 4 heures</MenuItem>
                <MenuItem value="4_6h">4 à 6 heures</MenuItem>
                <MenuItem value="plus_6h">Plus de 6 heures</MenuItem>
              </TextField>

              <TextField
                required
                id="message"
                name="message"
                label="Pourquoi souhaitez-vous adopter cet animal ? (Message)"
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
          </fieldset>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              m: 3,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              sx={{
                backgroundColor: "#778d45",
                "&:hover": { backgroundColor: "#66753a" },
              }}
            >
              Envoyer la demande
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Adoption;