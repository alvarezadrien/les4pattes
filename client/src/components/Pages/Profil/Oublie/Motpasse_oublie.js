import React, { useState } from "react";
import "./Motpasse_oublie.css"; // Ensure this CSS file is correctly linked

// Import Material-UI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// Import useTheme and useMediaQuery if you plan to use them directly for more complex responsive logic in JSX
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";

function MotpasseOublie() {
    // const theme = useTheme(); // Initialize theme if using
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Responsive width for inputs and button (adjust as needed)
    const getInputWidth = () => ({
        xs: '90%', // Up to 599px (approx. 480px in your range)
        sm: '85%', // 600px to 899px (approx. 481px-768px, 769px-1024px)
        md: '80%', // 900px to 1199px (approx. 1025px-1280px)
        lg: '70%', // 1200px to 1535px (approx. 1281px-1440px)
        xl: '60%', // 1536px and up
    });

    const formSx = {
        "& .MuiTextField-root": {
            marginBottom: "16px",
            // Removed fixed width: "100%", use responsive width from getInputWidth()
            maxWidth: "550px", // Base size, inputs won't exceed this
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
            // Apply responsive widths
            width: getInputWidth(),
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
            backgroundColor: 'white', // Ensure white background for input
        },
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!email) {
            setMessage("Veuillez entrer votre adresse email.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/password/forgot-password`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage("Un email vous a été envoyé si l'adresse est valide.");
            } else {
                setMessage(data.message || "Erreur lors de la demande.");
            }
        } catch (error) {
            console.error("Erreur:", error.message);
            setMessage("Erreur serveur.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-page-wrapper">
            <div className="forgot-password-main-content">
                <h1 className="forgot-password-heading">Mot de passe oublié ?</h1>

                <form onSubmit={handleSubmit} className="forgot-password-form-card">
                    <Box component="div" sx={formSx}>
                        <TextField
                            variant="outlined"
                            label="Email"
                            placeholder="Entrez votre email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </Box>

                    <Button
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        sx={{
                            backgroundColor: "#778d45",
                            "&:hover": { backgroundColor: "#5f7036" },
                            margin: "0 auto",
                            display: "block",
                            paddingY: '12px', // Make button taller
                            fontSize: '1.1rem', // Adjust font size
                            width: getInputWidth(),
                            maxWidth: "550px", // Consistent with input maxWidth
                            mt: 2, // Margin top for the button from the Box above
                        }}
                    >
                        {loading ? "Envoi..." : "Confirmer"}
                    </Button>

                    {message && (
                        <p className="forgot-password-message" style={{ textAlign: "center", marginTop: "16px" }}>
                            {message}
                        </p>
                    )}
                </form>
            </div>

            <div className="forgot-password-image-section">
                <img
                    src="/img/img_chat_oublie.jpg"
                    alt="Chat"
                    className="forgot-password-responsive-image"
                />
            </div>
        </div>
    );
}

export default MotpasseOublie;