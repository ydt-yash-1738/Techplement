// QuoteDisplay.jsx
import React from 'react';
import QuoteButton from './QuoteButton';
import QuoteContainer from './QuoteContainer';

function QuoteDisplay({ headingText, randomQuoteFetched, quoterandom, authorrandom, quote, author, handleRandomQuote }) {
  return (
    
    <QuoteContainer>
    
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{headingText}</h1>
      {randomQuoteFetched ? (
        <>
          <p className="text-xl md:text-2xl">{quoterandom}</p>
          <p className="text-lg md:text-xl">- {authorrandom}</p>
        </>
      ) : (
        <>
          <p className="text-xl md:text-2xl">{quote}</p>
          <p className="text-lg md:text-xl">- {author}</p>
        </>
      )}
      <QuoteButton onClick={handleRandomQuote} />
    
    </QuoteContainer>
    
  );
}

export default QuoteDisplay;
