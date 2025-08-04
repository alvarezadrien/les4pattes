// src/context/CartContext.js
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

    const incrementerQuantite = (id) => {
        setPanier((prev) =>
            prev.map((item) =>
                item._id === id ? { ...item, quantite: item.quantite + 1 } : item
            )
        );
    };

    const decrementerQuantite = (id) => {
        setPanier((prev) =>
            prev
                .map((item) =>
                    item._id === id && item.quantite > 1
                        ? { ...item, quantite: item.quantite - 1 }
                        : item
                )
                .filter((item) => item.quantite > 0)
        );
    };

    const viderPanier = () => setPanier([]);

    return (
        <CartContext.Provider
            value={{
                panier,
                ajouterAuPanier,
                retirerDuPanier,
                viderPanier,
                incrementerQuantite,
                decrementerQuantite,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
