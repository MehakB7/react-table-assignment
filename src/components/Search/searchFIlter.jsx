import React from "react";
import "./searchFilter.scss";

const SearchBox = ({ filter, setFilter }) => {
  return (
    <input
      className="searchbox"
      value={filter || ""}
      onChange={(e) => setFilter(e.target.value)}
      placeholder="search product or brand"
    />
  );
};

export default SearchBox;
