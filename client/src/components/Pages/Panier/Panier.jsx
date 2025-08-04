import React, { useState } from "react";
import "./Panier.css";

const Panier = () => {
  const [panier, setPanier] = useState([
    {
      id: 1,
      nom: "Croquettes Premium Chat - Poulet & Riz",
      prix: "19,99€",
      quantite: 2,
      image: "/img/img_boutique/croquettes_chat_pouletriz.png",
    },
    {
      id: 3,
      nom: "Croquettes Chien Énergie+ - Bœuf",
      prix: "24,90€",
      quantite: 1,
      image: "/img/img_boutique/croquettes_chien_boeufriz.png",
    },
  ]);

  const retirerDuPanier = (id) => {
    setPanier((prev) => prev.filter((item) => item.id !== id));
  };

  const viderPanier = () => {
    setPanier([]);
  };

  const incrementerQuantite = (id) => {
    setPanier((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantite: item.quantite + 1 } : item
      )
    );
  };

  const decrementerQuantite = (id) => {
    setPanier((prev) =>
      prev.map((item) =>
        item.id === id && item.quantite > 1
          ? { ...item, quantite: item.quantite - 1 }
          : item
      )
    );
  };

  const calculTotal = () => {
    return panier
      .reduce((total, item) => {
        const prix = parseFloat(item.prix.replace(",", ".").replace("€", ""));
        return total + prix * item.quantite;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="panier-container">
      <h1>Mon panier</h1>

      {panier.length === 0 ? (
        <p className="panier-vide">Votre panier est vide.</p>
      ) : (
        <>
          <ul className="liste-panier">
            {panier.map((item) => (
              <li key={item.id} className="item-panier">
                <img src={item.image} alt={item.nom} />
                <div className="details-article">
                  <h3>{item.nom}</h3>
                  <p>{item.prix}</p>
                  <div className="quantite-controls">
                    <button
                      className="btn-moins"
                      onClick={() => decrementerQuantite(item.id)}
                      disabled={item.quantite === 1}
                    >
                      −
                    </button>
                    <span className="quantite">{item.quantite}</span>
                    <button
                      className="btn-plus"
                      onClick={() => incrementerQuantite(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => retirerDuPanier(item.id)}
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
              <button className="btn-valider">Valider ma commande</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Panier;
