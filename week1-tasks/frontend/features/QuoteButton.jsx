// QuoteButton.jsx
import React from 'react';

function QuoteButton({ onClick }) {
  return (
    <button onClick={onClick} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Random Quote</button>
  );
}

export default QuoteButton;
