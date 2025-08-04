import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [panier, setPanier] = useState([]);

    const ajouterAuPanier = (produit) => {
        setPanier((prev) => {
            const existant = prev.find((item) => item._id === produit._id);
            if (existant) {
                return prev.map((item) =>
                    item._id === produit._id
                        ? { ...item, quantite: item.quantite + 1 }
                        : item
                );
            }
            return [...prev, { ...produit, quantite: 1 }];
        });
    };

    const retirerDuPanier = (id) => {
        setPanier((prev) => prev.filter((item) => item._id !== id));
    };

    const viderPanier = () => setPanier([]);

    return (
        <CartContext.Provider
            value={{ panier, ajouterAuPanier, retirerDuPanier, viderPanier }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
