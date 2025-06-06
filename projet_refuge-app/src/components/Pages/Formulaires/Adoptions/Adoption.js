// Adoption.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Adoption.css";
import emailjs from "emailjs-com";

// Import de Material-UI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography"; // Ajout de Typography pour les titres et textes
import Alert from "@mui/material/Alert"; // Ajout d'Alert pour les messages importants
import AlertTitle from "@mui/material/AlertTitle"; // Ajout d'AlertTitle pour les titres d'alertes

const Adoption = () => {
  const location = useLocation();
  const { animalData } = location.state || {};

  const [statusMessage, setStatusMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupClass, setPopupClass] = useState("");

  // Nouveaux états pour la gestion de l'authentification
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simule l'état de connexion
  const [showRegister, setShowRegister] = useState(false); // Gère l'affichage du formulaire d'inscription
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authConfirmPassword, setAuthConfirmPassword] = useState(""); // Pour l'inscription

  const [formdata1, setFormData] = useState({
    name: "",
    prenom: "",
    email: "", // Cet email sera pré-rempli si l'utilisateur est connecté
    telephone: "",
    animal: animalData?.espece === "chat" ? "chat" : animalData?.espece === "chien" ? "chien" : "",
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

  useEffect(() => {
    if (animalData) {
      setFormData((prevData) => ({
        ...prevData,
        animal: animalData.espece === "chat" ? "chat" : animalData.espece === "chien" ? "chien" : "",
        animalNom: animalData.nom || "",
        animalEspece: animalData.espece || "",
        animalRace: animalData.race || "",
        animalAge: animalData.age ? `${animalData.age} ans` : "",
        animalSexe: animalData.sexe || "",
        animalDescription: animalData.description || "",
      }));
    }
  }, [animalData]);

  // Pré-remplir l'email du formulaire d'adoption si l'utilisateur est "connecté"
  useEffect(() => {
    if (isLoggedIn && authEmail) {
      setFormData((prevData) => ({
        ...prevData,
        email: authEmail,
      }));
    }
  }, [isLoggedIn, authEmail]);


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
    experienceAnimaux: false,
    heuresConsacrees: false,
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

  // Simule la connexion
  const handleLogin = (event) => {
    event.preventDefault();
    // Ici, vous intégreriez votre logique de connexion réelle (API, Firebase, etc.)
    // Pour cet exemple, on simule une connexion réussie
    if (authEmail && authPassword) {
      console.log("Tentative de connexion avec:", authEmail, authPassword);
      setIsLoggedIn(true);
      setStatusMessage("Connexion réussie ! Vous pouvez maintenant compléter le formulaire.");
      setPopupClass("success");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } else {
      setStatusMessage("Veuillez entrer votre email et mot de passe.");
      setPopupClass("error");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  // Simule l'inscription
  const handleRegister = (event) => {
    event.preventDefault();
    // Ici, vous intégreriez votre logique d'inscription réelle
    if (authPassword !== authConfirmPassword) {
      setStatusMessage("Les mots de passe ne correspondent pas.");
      setPopupClass("error");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }
    if (authEmail && authPassword) {
      console.log("Tentative d'inscription avec:", authEmail, authPassword);
      // Simule une inscription réussie puis connexion
      setIsLoggedIn(true);
      setStatusMessage("Inscription réussie et connexion automatique ! Vous pouvez maintenant compléter le formulaire.");
      setPopupClass("success");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      setShowRegister(false); // Revenir au formulaire de connexion (ou directement le formulaire d'adoption)
    } else {
      setStatusMessage("Veuillez remplir tous les champs.");
      setPopupClass("error");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  const handlesubmit1 = (event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      setStatusMessage("Veuillez vous connecter ou créer un compte pour envoyer votre demande.");
      setPopupClass("error");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
      return; // Empêche l'envoi si non connecté
    }

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

          setFormData({
            name: "",
            prenom: "",
            email: authEmail, // Conserver l'email de l'utilisateur connecté
            telephone: "",
            animal: animalData?.espece === "chat" ? "chat" : animalData?.espece === "chien" ? "chien" : "",
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
            experienceAnimaux: false,
            heuresConsacrees: false,
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

      <div className="auth-section-container">
        <Box
          sx={{
            p: 3,
            border: "1px solid #778d45",
            borderRadius: "8px",
            mb: 4,
            width: "fit-content",
            margin: "20px auto",
            backgroundColor: "white",
            boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h5" component="h3" gutterBottom align="center" sx={{ color: "#778d45", mb: 2 }}>
            Pour adopter, vous devez avoir un compte.
          </Typography>

          {!isLoggedIn && (
            <Alert severity="info" sx={{ mb: 3 }}>
              <AlertTitle>Information importante pour votre demande d'adoption</AlertTitle>
              Afin de traiter votre demande et d'assurer un suivi personnalisé, il est **nécessaire de vous connecter ou de créer un compte**. Cela nous permet de conserver vos informations en toute sécurité et de faciliter la communication avec vous.
            </Alert>
          )}


          {!isLoggedIn ? (
            <div className="auth-forms">
              {showRegister ? (
                // Formulaire d'inscription
                <form onSubmit={handleRegister}>
                  <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                    **Créez votre compte en quelques secondes :**
                  </Typography>
                  <TextField
                    required
                    label="Votre adresse email"
                    type="email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    margin="normal"
                    fullWidth
                    sx={{
                      "& label.Mui-focused": { color: "#778d45" },
                      "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "#778d45" }, "&.Mui-focused fieldset": { borderColor: "#778d45" } },
                    }}
                  />
                  <TextField
                    required
                    label="Choisissez un mot de passe"
                    type="password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    margin="normal"
                    fullWidth
                    sx={{
                      "& label.Mui-focused": { color: "#778d45" },
                      "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "#778d45" }, "&.Mui-focused fieldset": { borderColor: "#778d45" } },
                    }}
                  />
                  <TextField
                    required
                    label="Confirmez votre mot de passe"
                    type="password"
                    value={authConfirmPassword}
                    onChange={(e) => setAuthConfirmPassword(e.target.value)}
                    margin="normal"
                    fullWidth
                    sx={{
                      "& label.Mui-focused": { color: "#778d45" },
                      "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "#778d45" }, "&.Mui-focused fieldset": { borderColor: "#778d45" } },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      mb: 1,
                      backgroundColor: "#778d45",
                      "&:hover": { backgroundColor: "#66753a" },
                    }}
                  >
                    S'inscrire et commencer ma demande
                  </Button>
                  <Button
                    onClick={() => setShowRegister(false)}
                    fullWidth
                    sx={{
                      color: "#778d45",
                      "&:hover": { backgroundColor: "rgba(119, 141, 69, 0.1)" },
                    }}
                  >
                    J'ai déjà un compte
                  </Button>
                </form>
              ) : (
                // Formulaire de connexion
                <form onSubmit={handleLogin}>
                  <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                    **Connectez-vous pour continuer votre demande :**
                  </Typography>
                  <TextField
                    required
                    label="Votre adresse email"
                    type="email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    margin="normal"
                    fullWidth
                    sx={{
                      "& label.Mui-focused": { color: "#778d45" },
                      "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "#778d45" }, "&.Mui-focused fieldset": { borderColor: "#778d45" } },
                    }}
                  />
                  <TextField
                    required
                    label="Votre mot de passe"
                    type="password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    margin="normal"
                    fullWidth
                    sx={{
                      "& label.Mui-focused": { color: "#778d45" },
                      "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "#778d45" }, "&.Mui-focused fieldset": { borderColor: "#778d45" } },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      mb: 1,
                      backgroundColor: "#778d45",
                      "&:hover": { backgroundColor: "#66753a" },
                    }}
                  >
                    Me connecter
                  </Button>
                  <Button
                    onClick={() => setShowRegister(true)}
                    fullWidth
                    sx={{
                      color: "#778d45",
                      "&:hover": { backgroundColor: "rgba(119, 141, 69, 0.1)" },
                    }}
                  >
                    Pas encore de compte ? S'inscrire
                  </Button>
                </form>
              )}
            </div>
          ) : (
            // Message si l'utilisateur est connecté
            <Box textAlign="center">
              <Typography variant="body1" sx={{ mb: 2 }}>
                Bonjour **{authEmail}** ! Vous êtes bien connecté(e). <br />
                Vous pouvez maintenant **remplir le formulaire ci-dessous** pour envoyer votre demande d'adoption.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  setIsLoggedIn(false);
                  setAuthEmail("");
                  setAuthPassword("");
                  setAuthConfirmPassword(""); // Réinitialiser aussi le champ de confirmation
                  // Réinitialiser l'email du formulaire d'adoption si déconnexion
                  setFormData((prevData) => ({ ...prevData, email: "" }));
                  setShowRegister(false); // Revenir par défaut au formulaire de connexion après déconnexion
                }}
                sx={{
                  borderColor: "#778d45",
                  color: "#778d45",
                  "&:hover": { backgroundColor: "rgba(119, 141, 69, 0.1)", borderColor: "#66753a" },
                }}
              >
                Se déconnecter
              </Button>
            </Box>
          )}
        </Box>
      </div>

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
              {/* Informations de l'animal - pré-remplies ou vides */}
              <TextField
                id="animalNom"
                name="animalNom"
                label="Nom de l'animal"
                value={formdata1.animalNom}
                InputProps={{
                  readOnly: true,
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
                disabled={isLoggedIn} // Désactiver le champ email si l'utilisateur est connecté
                helperText={isLoggedIn ? "Votre adresse email est pré-remplie car vous êtes connecté(e)." : "Veuillez vous connecter pour pré-remplir ce champ."}
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
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
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
              />
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
              disabled={!isLoggedIn} // Désactiver le bouton si non connecté
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