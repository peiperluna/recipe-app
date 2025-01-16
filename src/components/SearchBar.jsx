import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ setSearchTerm }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(input);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search for recipes..." />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
