import React, { useState, useEffect } from "react";
import "./Carousel.css";

function Carousel({ recipes }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === recipes.length - 1 ? 0 : prevIndex + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [recipes]);

  return (
    <div className="carousel">
      <div
        className="carousel-inner"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 0.5s ease",
        }}
      >
        {recipes.map((recipe) => (
          <div key={recipe.RCP_SEQ} className="carousel-item">
            <img src={recipe.ATT_FILE_NO_MAIN} alt={recipe.RCP_NM} />
            <h3>{recipe.RCP_NM}</h3>
          </div>
        ))}
      </div>
      <div className="carousel-indicators">
        {recipes.map((_, index) => (
          <button key={index} className={index === currentIndex ? "active" : ""} onClick={() => setCurrentIndex(index)} />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
