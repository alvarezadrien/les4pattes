import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import "./Produit.css";

const Produit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ajouterAuPanier } = useCart(); // ✅ Correction ici

  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduit = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/produits`
        );
        const data = await res.json();
        const item = data.find((p) => p._id === id);
        setProduit(item);
      } catch (error) {
        console.error("Erreur lors du chargement du produit :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduit();
  }, [id]);

  if (loading) return <div className="erreur-produit">Chargement...</div>;
  if (!produit)
    return <div className="erreur-produit">Produit introuvable.</div>;

  return (
    <div className="produit-page">
      <button onClick={() => navigate(-1)} className="btn-retour">
        ← Retour
      </button>
      <div className="produit-detail">
        <img src={produit.image} alt={produit.nom} className="produit-image" />
        <div className="produit-info">
          <h1>{produit.nom}</h1>
          <p className="produit-description">{produit.description}</p>
          <p>
            <strong>Poids :</strong> {produit.poids}
          </p>
          <p>
            <strong>Prix :</strong> {produit.prix}
          </p>
          <p>
            <strong>Disponibilité :</strong>{" "}
            <span className="stock">{produit.stock}</span>
          </p>
          <button
            className="btn-achat"
            onClick={() => ajouterAuPanier(produit)}
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default Produit;
