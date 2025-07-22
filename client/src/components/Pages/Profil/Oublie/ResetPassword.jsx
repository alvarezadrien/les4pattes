import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ResetPassword.css";

// Import Material-UI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles"; // Import useTheme
import useMediaQuery from "@mui/material/useMediaQuery"; // Import useMediaQuery

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const theme = useTheme(); // Initialize theme

  // Media queries for responsive input widths
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // Up to 599px (approx 480px)
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600px to 959px (approx 481px-768px, 769px-1024px)
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg")); // 960px to 1279px (approx 1025px-1280px)
  const isLg = useMediaQuery(theme.breakpoints.up("lg")); // 1280px and up (approx 1281px-1440px and beyond)

  // Determine input width based on screen size
  const getInputWidth = () => {
    if (isXs) return "90%"; // For extra-small screens (up to 480px)
    if (isSm) return "80%"; // For small screens (481px to 768px, and up to 1024px)
    if (isMd) return "60%"; // For medium screens (1025px to 1280px)
    if (isLg) return "40ch"; // For large screens (1281px and above)
    return "30ch"; // Default width
  };

  const formSx = {
    "& .MuiTextField-root": {
      m: 1,
      width: getInputWidth(), // Dynamic width based on screen size
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
        `${process.env.REACT_APP_API_URL}/api/password/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword }),
        }
      );

      const text = await response.text();
      console.log("Réponse brute : ", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error("Réponse invalide (pas du JSON)");
      }

      if (response.ok) {
        console.log("✅ Réinitialisation réussie");
        setSuccessMessage(data.message);
        setTimeout(() => {
          navigate("/Connexion");
        }, 2000);
      } else {
        console.log("❌ Erreur backend : ", data.message);
        setErrorMessage(data.message || "Erreur lors de la réinitialisation.");
      }
    } catch (error) {
      console.error("Erreur serveur :", error.message);
      setErrorMessage("Erreur serveur : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-content">
        <h1 className="reset-password-title">
          Réinitialisation du mot de passe
        </h1>

        <form onSubmit={handleSubmit} className="reset-password-form-container">
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
              width: getInputWidth(), // Dynamic width for the button too
              maxWidth: "500px",
            }}
          >
            {loading ? "Envoi..." : "Valider"}
          </Button>

          {errorMessage && (
            <p className="reset-password-error-message">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="reset-password-success-message">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
