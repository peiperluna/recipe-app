import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import "./App.css";
import Carousel from "./components/Carousel";

const API_URL = "https://openapi.foodsafetykorea.go.kr/api/1ff0e87c807944eab75b/COOKRCP01/json/1/10";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopular, setIsPopular] = useState(false);

  useEffect(() => {
    console.log("Fetching initial popular recipes");
    fetchRecipes("popular", true);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      fetchRecipes(searchTerm, false);
    }
  }, [searchTerm]);

  const fetchRecipes = async (query, popular = false) => {
    try {
      console.log("Fetching recipes for:", query, "Popular:", popular);
      let url;

      if (popular) {
        // 인기 레시피를 가져오는 경우
        url = `https://openapi.foodsafetykorea.go.kr/api/1ff0e87c807944eab75b/COOKRCP01/json/1/10`; // 인기 레시피 요청
      } else {
        // 검색 쿼리를 사용하여 레시피를 가져오는 경우
        url = `https://openapi.foodsafetykorea.go.kr/api/1ff0e87c807944eab75b/COOKRCP01/json/1/10/RCP_NM=${query}`; // 쿼리로 검색
      }

      const response = await fetch(url);
      const data = await response.json();
      console.log("API response:", data);

      if (popular && data.COOKRCP01.row) {
        setRecipes(data.COOKRCP01.row); // 인기 레시피 설정
        setIsPopular(true);
      } else if (!popular && data.COOKRCP01.row) {
        setRecipes(data.COOKRCP01.row); // 검색 결과 설정
        setIsPopular(false);
      } else {
        console.log("No recipes found in API response");
        setRecipes([]);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleTitleClick = () => {
    fetchRecipes("popular", true); // 인기 레시피를 다시 가져옵니다.
  };

  return (
    <Router>
      <div className="App">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1>오늘 뭐먹지?</h1>
        </Link>
        <SearchBar setSearchTerm={setSearchTerm} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {isPopular && recipes.length > 0 ? (
                  <div>
                    <h2>오늘의 인기 레시피</h2>
                    <Carousel recipes={recipes} />
                  </div>
                ) : recipes.length > 0 ? (
                  <RecipeList recipes={recipes} />
                ) : (
                  <p>No recipes found. Try searching for something!</p>
                )}
              </>
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
