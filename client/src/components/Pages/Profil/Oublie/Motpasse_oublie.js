import React, { useState } from "react";
import "./Motpasse_oublie.css";

// Import Material-UI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const formSx = {
    "& .MuiTextField-root": {
        marginBottom: "16px",
        width: "100%",
        maxWidth: "480px",
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
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

function MotpasseOublie() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

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
        <div className="page_oublie">
            <div className="left-content">
                <h1 className="h1_oublie">Mot de passe oublié ?</h1>

                <form onSubmit={handleSubmit} className="container_form_login">
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
                            width: "240px", // équivalent à 30ch environ
                        }}
                    >
                        {loading ? "Envoi..." : "Confirmer"}
                    </Button>

                    {message && (
                        <p style={{ textAlign: "center", marginTop: "16px" }}>{message}</p>
                    )}
                </form>
            </div>

            <img
                src="/img/img_chat_oublie.jpg"
                alt="Chat"
                className="right-oublie-image"
            />
        </div>
    );
}

export default MotpasseOublie;
