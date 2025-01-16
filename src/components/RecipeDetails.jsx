import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetails.css";

const API_KEY = import.meta.env.VITE_API_KEY;
const SERVICE_ID = "COOKRCP01"; // 서비스 ID
const DATA_TYPE = "json"; // 요청 파일 타입

function RecipeDetails() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        if (!id) {
          console.error("Invalid recipe ID");
          return;
        }

        // API URL 구성 (단일 레시피 조회 방식으로 수정 필요)
        const url = `https://openapi.foodsafetykorea.go.kr/api/${API_KEY}/${SERVICE_ID}/${DATA_TYPE}/1/1000`; // 임시로 더 많은 레시피를 가져옵니다.

        const response = await fetch(url);
        const data = await response.json();
        console.log("API response:", data);

        if (data?.COOKRCP01?.row) {
          const matchingRecipe = data.COOKRCP01.row.find((recipe) => recipe.RCP_SEQ === id);
          if (matchingRecipe) {
            setRecipe(matchingRecipe);
          } else {
            console.error("No matching recipe found for ID:", id);
          }
        } else {
          console.error("No recipes found in the response");
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="recipe-details">
      <h2>{recipe.RCP_NM}</h2>
      <img src={recipe.ATT_FILE_NO_MAIN} alt={recipe.RCP_NM} />

      <h3>Ingredients:</h3>
      <ul>{recipe.RCP_PARTS_DTLS && recipe.RCP_PARTS_DTLS.split(",").map((ingredient, index) => <li key={index}>{ingredient.trim()}</li>)}</ul>

      <h3>Instructions:</h3>
      <ol>{Array.from({ length: 20 }, (_, index) => recipe[`MANUAL0${index + 1}`] && <li key={index}>{recipe[`MANUAL0${index + 1}`]}</li>)}</ol>

      <h3>Nutritional Information:</h3>
      <p>Weight (per serving): {recipe.INFO_WGT}</p>
      <p>Calories: {recipe.INFO_ENG}</p>
      <p>Carbohydrates: {recipe.INFO_CAR}</p>
      <p>Protein: {recipe.INFO_PRO}</p>
      <p>Fat: {recipe.INFO_FAT}</p>
      <p>Sodium: {recipe.INFO_NA}</p>

      <h3>Cooking Method:</h3>
      <p>{recipe.RCP_WAY2}</p>

      <h3>Cooking Tips:</h3>
      <p>{recipe.RCP_NA_TIP}</p>

      <h3>Tags:</h3>
      <p>{recipe.HASH_TAG}</p>
    </div>
  );
}

export default RecipeDetails;
