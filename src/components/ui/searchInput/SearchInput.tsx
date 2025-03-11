import React, { useState } from "react";
import styles from "./searchInput.module.scss";

interface SearchInputProps {
  fetchOnSearch: (searchQuery: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ fetchOnSearch }) => {
  const [query, setQuery] = useState("");
  console.log(query);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === "") {
      fetchOnSearch("");
    } else {
      fetchOnSearch(query);
    }
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchInput}>
      <input
        type="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SearchInput;
