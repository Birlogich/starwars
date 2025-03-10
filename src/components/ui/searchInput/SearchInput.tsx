import React, { useState } from "react";

interface SearchInputProps {
  fetchOnSearch: (searchQuery: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ fetchOnSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchOnSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchInput;
