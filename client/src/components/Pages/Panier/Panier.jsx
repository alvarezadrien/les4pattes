import React, { useState } from "react";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import "./Panier.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Panier = () => {
  const {
    panier,
    retirerDuPanier,
    viderPanier,
    incrementerQuantite,
    decrementerQuantite,
  } = useCart();

  const { user } = useAuth();
  const [adresseVisible, setAdresseVisible] = useState(false);

  const calculTotal = () => {
    return panier
      .reduce((total, item) => {
        const prix = parseFloat(item.prix.replace(",", ".").replace("€", ""));
        return total + prix * item.quantite;
      }, 0)
      .toFixed(2);
  };

  const handleStripeCheckout = async () => {
    if (!user || !user.adresse) {
      alert("Veuillez vous connecter et enregistrer une adresse de livraison.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/panier/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: panier,
            adresse: user.adresse, // <-- Envoi de l’adresse
            userId: user._id,
            email: user.email,
          }),
        }
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Erreur lors de la redirection vers Stripe.");
      }
    } catch (error) {
      console.error("Erreur Stripe :", error);
      alert("Erreur lors de la validation du paiement.");
    }
  };

  return (
    <div className="panier-container">
      <h1>Mon panier</h1>

      {user && user.adresse && (
        <div className="adresse-livraison">
          <h3>Adresse de livraison</h3>
          <p>
            {user.adresse.rue}, {user.adresse.ville}
          </p>
          <p>
            {user.adresse.codePostal}, {user.adresse.pays}
          </p>
          <button
            className="btn-modifier-adresse"
            onClick={() => setAdresseVisible(true)}
          >
            Modifier l’adresse
          </button>
        </div>
      )}

      {panier.length === 0 ? (
        <p className="panier-vide">Votre panier est vide.</p>
      ) : (
        <>
          <ul className="liste-panier">
            {panier.map((item) => (
              <li key={item._id} className="item-panier">
                <img src={`/${item.image}`} alt={item.nom} />
                <div className="details-article">
                  <h3>{item.nom}</h3>
                  <p>{item.prix}</p>
                  <div className="quantite-controls">
                    <button
                      className="btn-moins"
                      onClick={() => decrementerQuantite(item._id)}
                      disabled={item.quantite === 1}
                    >
                      −
                    </button>
                    <span className="quantite">{item.quantite}</span>
                    <button
                      className="btn-plus"
                      onClick={() => incrementerQuantite(item._id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => retirerDuPanier(item._id)}
                  className="btn-retirer"
                >
                  Retirer
                </button>
              </li>
            ))}
          </ul>

          <div className="panier-total">
            <p>
              Total : <strong>{calculTotal()} €</strong>
            </p>
            <div className="actions-panier">
              <button onClick={viderPanier} className="btn-vider">
                Vider le panier
              </button>
              <button className="btn-valider" onClick={handleStripeCheckout}>
                Valider ma commande
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Panier;
