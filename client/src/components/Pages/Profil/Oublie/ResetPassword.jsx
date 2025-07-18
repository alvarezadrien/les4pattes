import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ResetPassword.css";

// Import Material-UI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const formSx = {
  "& .MuiTextField-root": {
    m: 1,
    width: "30ch",
    maxWidth: "500px",
    display: "flex",
    margin: "0 auto 1rem auto",
  },
  "& .MuiInputLabel-root": {
    color: "black",
    "&.Mui-focused": {
      color: "#778d45",
    },
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
};

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!newPassword || !confirmPassword) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/password/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setTimeout(() => {
          navigate("/Connexion");
        }, 2000);
      } else {
        setErrorMessage(data.message || "Erreur lors de la réinitialisation.");
      }
    } catch (error) {
      setErrorMessage("Erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page_reset">
      <div className="left-content">
        <h1 className="h1_reset">Réinitialisation du mot de passe</h1>

        <form onSubmit={handleSubmit} className="container_form_reset">
          <Box component="div" sx={formSx}>
            <TextField
              fullWidth
              variant="outlined"
              type="password"
              label="Nouveau mot de passe"
              placeholder="Entrez un nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="password"
              label="Confirmer le mot de passe"
              placeholder="Confirmez le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </Box>

          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              backgroundColor: "#778d45",
              "&:hover": { backgroundColor: "#5f7036" },
              margin: "0 auto",
              display: "block",
              width: "30ch",
            }}
          >
            {loading ? "Envoi..." : "Valider"}
          </Button>

          {errorMessage && (
            <p style={{ color: "red", textAlign: "center", marginTop: "1rem" }}>
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p
              style={{ color: "green", textAlign: "center", marginTop: "1rem" }}
            >
              {successMessage}
            </p>
          )}
        </form>
      </div>

      <img
        src="/img/img_chat_reset.jpg"
        alt="Chat"
        className="right-reset-image"
      />
    </div>
  );
}

export default ResetPassword;
