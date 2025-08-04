import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Produit.css";

const produits = [
  {
    id: "1",
    nom: "Croquettes Premium Chat - Poulet & Riz",
    espece: "chat",
    description:
      "Croquettes complètes pour chats adultes, riches en protéines et digestes.",
    prix: "19,99€",
    poids: "2,5 kg",
    image: "/img/img_boutique/croquettes_chat_pouletriz.png",
    stock: "En stock",
  },
  {
    id: "2",
    nom: "Croquettes Naturelles Chat - Saumon",
    espece: "chat",
    description:
      "Aliment complet pour chats adultes, sans céréales, au bon goût de saumon.",
    prix: "22,50€",
    poids: "2 kg",
    image: "/img/img_boutique/croquettes_chat_saumon.png",
    stock: "En stock",
  },
  {
    id: "3",
    nom: "Croquettes Chien Énergie+ - Bœuf",
    espece: "chien",
    description:
      "Formule riche pour chiens actifs. Saveur bœuf, digestion facile.",
    prix: "24,90€",
    poids: "2,5 kg",
    image: "/img/img_boutique/croquettes_chien_boeufriz.png",
    stock: "Peu de stock",
  },
  {
    id: "4",
    nom: "Croquettes Hypoallergéniques Chien - Poulet & Riz",
    espece: "chien",
    description: "Sans gluten. Idéal pour les chiens sensibles.",
    prix: "26,30€",
    poids: "2,5 kg",
    image: "/img/img_boutique/croquettes_chien_pouletriz.png",
    stock: "En stock",
  },
];

const Produit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const produit = produits.find((p) => p.id === id);

  if (!produit) {
    return <div className="erreur-produit">Produit introuvable.</div>;
  }

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
          <button className="btn-achat">Ajouter au panier</button>
        </div>
      </div>
    </div>
  );
};

export default Produit;
