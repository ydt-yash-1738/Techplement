import React from 'react';

function QuoteSearch({ searchTerm, handleSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by author's name"
      className="mb-4 px-4 py-2 w-full rounded-md"
      value={searchTerm}
      onChange={handleSearch}
    />
  );
}

export default QuoteSearch;
