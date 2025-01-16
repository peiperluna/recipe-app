import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe.RCP_SEQ}`} className="recipe-card">
      <img src={recipe.ATT_FILE_NO_MAIN} alt={recipe.RCP_NM} />
      <h3>{recipe.RCP_NM}</h3>
    </Link>
  );
}

export default RecipeCard;
