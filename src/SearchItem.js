import React from "react";

const SearchItem = ({searchItem, setSearchItem}) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search">Search Item(s) in list</label>
      <input
        id="search"
        role="searchbox"
        placeholder="Search Item(s) from the List"
        type="text"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />
    </form>
  );
};

export default SearchItem;
