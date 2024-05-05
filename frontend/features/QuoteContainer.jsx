import React from 'react';

function QuoteContainer({ children }) {
  return (
    <div className='w-full max-w-md mx-auto rounded-md bg-gradient-to-r from-blue-300 via-blue-500 to-blue-200 p-1 quote-container'>
      <div className="max-h-screen overflow-y-auto text-center p-8 shadow-xl md:p-8 bg-gray-800 text-white rounded-sm quote-content">
        {children}
      </div>
    </div>
  );
}

export default QuoteContainer;
