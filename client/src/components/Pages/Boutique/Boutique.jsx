import React, { useEffect, useState } from "react";
import "./Boutique.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import Pagination from "../../Widgets/Pagination/Pagination";
import FiltresCategorie from "../../Widgets/FiltresCategorie/FiltresCategorie";

const Boutique = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategorie, setSelectedCategorie] = useState(""); // ✅ état filtre
  const produitsParPage = 24;

  const navigate = useNavigate();
  const { ajouterAuPanier, panier } = useCart();

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
        setLoading(false);
      }
    };

    fetchProduits();
  }, []);

  const handleAddToCart = (produit, e) => {
    e.stopPropagation();
    ajouterAuPanier(produit);
  };

  const getQuantiteDansPanier = (id) => {
    const item = panier.find((p) => p._id === id);
    return item ? item.quantite : 0;
  };

  const categoriesDisponibles = [...new Set(produits.map((p) => p.categorie))];

  // ✅ produits filtrés par catégorie
  const produitsFiltres = selectedCategorie
    ? produits.filter((p) => p.categorie === selectedCategorie)
    : produits;

  const indexOfLastProduit = currentPage * produitsParPage;
  const indexOfFirstProduit = indexOfLastProduit - produitsParPage;
  const currentProduits = produitsFiltres.slice(
    indexOfFirstProduit,
    indexOfLastProduit
  );
  const totalPages = Math.ceil(produitsFiltres.length / produitsParPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return <div className="boutique-loading">Chargement des produits...</div>;
  }

  return (
    <div className="boutique-container">
      <h1 className="boutique-titre">Boutique Croquettes</h1>
      <p className="boutique-slogan">
        Faites plaisir à vos compagnons tout en soutenant notre refuge !
      </p>

      {/* ✅ Filtres catégories */}
      <FiltresCategorie
        categories={categoriesDisponibles}
        selectedCategorie={selectedCategorie}
        onChange={setSelectedCategorie}
      />

      <div className="produits-grille">
        {currentProduits.map((produit) => {
          const quantite = getQuantiteDansPanier(produit._id);

          return (
            <div
              key={produit._id}
              className="carte-produit"
              onClick={() => navigate(`/Produit/${produit._id}`)}
            >
              <img
                src={`/${produit.image}`}
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

              {quantite > 0 && (
                <div className="quantite-panier">
                  🛒 {quantite} ajouté{quantite > 1 ? "s" : ""}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Boutique;
