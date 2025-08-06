import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import "./Produit.css";

const Produit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ajouterAuPanier, retirerDuPanier, panier } = useCart();

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

  if (loading)
    return <div className="erreur-produit">Chargement du produit...</div>;
  if (!produit)
    return <div className="erreur-produit">Produit introuvable.</div>;

  const imagePath = `/${produit.image}`;

  // ✅ quantité déjà dans le panier
  const itemDansPanier = panier.find((item) => item._id === produit._id);
  const quantite = itemDansPanier ? itemDansPanier.quantite : 0;

  return (
    <div className="produit-page">
      <button onClick={() => navigate(-1)} className="btn-retour">
        ← Retour
      </button>

      <div className="produit-detail">
        <img src={imagePath} alt={produit.nom} className="produit-image" />
        <div className="produit-info">
          <h1>{produit.nom}</h1>
          <p className="produit-description">{produit.description}</p>
          <p>
            <strong>Poids :</strong> {produit.poids || "N/A"}
          </p>
          <p>
            <strong>Prix :</strong> {produit.prix}
          </p>
          <p>
            <strong>Disponibilité :</strong>{" "}
            <span className="stock">
              {produit.stock > 10
                ? "En stock"
                : produit.stock > 0
                ? "Peu de stock"
                : "Rupture de stock"}
            </span>
          </p>

          {quantite > 0 && (
            <div className="compteur-panier">
              <p>Déjà ajouté : {quantite}</p>
              <button
                onClick={() => retirerDuPanier(produit)}
                className="btn-retirer"
              >
                −
              </button>
              <button
                onClick={() => ajouterAuPanier(produit)}
                className="btn-ajouter"
                disabled={quantite >= produit.stock}
              >
                +
              </button>
            </div>
          )}

          {quantite === 0 && (
            <button
              className="btn-achat"
              onClick={() => ajouterAuPanier(produit)}
              disabled={produit.stock === 0}
            >
              Ajouter au panier
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Produit;
