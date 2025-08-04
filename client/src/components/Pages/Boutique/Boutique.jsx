// src/components/Pages/Boutique.jsx
import React, { useEffect, useState } from "react";
import "./Boutique.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext"; // ✅ import du contexte panier

const Boutique = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ état de chargement
  const navigate = useNavigate();
  const { ajouterAuPanier } = useCart(); // ✅ fonction correcte depuis le contexte

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/produits`
        );
        const data = await res.json();
        setProduits(data);
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      } finally {
        setLoading(false); // ✅ désactive le loading
      }
    };

    fetchProduits();
  }, []);

  const handleAddToCart = (produit, e) => {
    e.stopPropagation(); // ✅ empêche le clic de naviguer
    ajouterAuPanier(produit); // ✅ ajoute au panier avec la bonne fonction
  };

  if (loading) {
    return <div className="boutique-loading">Chargement des produits...</div>; // ✅ affichage du loader
  }

  return (
    <div className="boutique-container">
      <h1 className="boutique-titre">Boutique Croquettes</h1>
      <p className="boutique-slogan">
        Faites plaisir à vos compagnons tout en soutenant notre refuge !
      </p>
      <div className="produits-grille">
        {produits.map((produit) => (
          <div
            key={produit._id}
            className="carte-produit"
            onClick={() => navigate(`/Produit/${produit._id}`)}
          >
            <img
              src={`/${produit.image}`} // ✅ les images depuis public/img/img_boutique
              alt={produit.nom}
              className="image-produit"
            />
            <h2 className="nom-produit">{produit.nom}</h2>
            <p className="description-produit">{produit.description}</p>
            <p className="prix-produit">{produit.prix}</p>
            <button
              className="btn-ajouter"
              onClick={(e) => handleAddToCart(produit, e)}
            >
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Boutique;
