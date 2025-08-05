import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import "./LanguettePanier.css";

const LanguettePanier = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Panier");
  };

  return (
    <div className="languette-panier" onClick={handleClick}>
      <ShoppingCart size={28} />
    </div>
  );
};

export default LanguettePanier;
