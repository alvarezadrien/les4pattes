import React from "react";
import { useNavigate } from "react-router-dom";
import "./LanguetteBoutique.css";
import { ShoppingBag } from "lucide-react";

const LanguetteBoutique = () => {
  const navigate = useNavigate();

  return (
    <div
      className="languette-boutique"
      onClick={() => navigate("/Boutique")}
      title="Accéder à la boutique"
    >
      <ShoppingBag size={22} />
    </div>
  );
};

export default LanguetteBoutique;
