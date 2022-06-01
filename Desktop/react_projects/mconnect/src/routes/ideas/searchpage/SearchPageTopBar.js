import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const SearchPageTopBar = ({ setNavValue, searchTerm, setSearchTerm }) => {
  const onSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const onBackClick = () => {
    setNavValue("/ideas");
  };
  return (
    <div className="fixed top-0 w-full p-3 flex justify-between items-center bg-white shadow z-10">
      <button onClick={onBackClick}>
        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
      </button>
      <input
        id="searchInput"
        className="w-full mx-2 px-2 h-8"
        placeholder="검색..."
        autoComplete="off"
        value={searchTerm}
        onChange={onSearchTermChange}
      />
    </div>
  );
};

export default SearchPageTopBar;
