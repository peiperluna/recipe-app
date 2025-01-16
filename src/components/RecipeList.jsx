import React from "react";
import RecipeCard from "./RecipeCard";
import "./RecipeList.css";

function RecipeList({ recipes }) {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.RCP_SEQ} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeList;
