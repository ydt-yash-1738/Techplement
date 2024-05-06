import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import TopLoadingBar from 'react-top-loading-bar'; 
import './index.css'; 
import audioFile from './assets/1.mp3';
import backgroundImage from './assets/bg.jpg';

function QuoteOfTheDay() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [quoterandom, setQuoterandom] = useState('');
  const [authorrandom, setAuthorrandom] = useState('');
  const [show, setShow] = useState(false);
  const [randomQuoteFetched, setRandomQuoteFetched] = useState(false);
  const [quoteBySearch, setQuoteBySearch] = useState(false);
  const [headingText, setHeadingText] = useState('');
  const [audioOn, setAudioOn] = useState(false); 
  const [searchTag, setSearchTag] = useState('');
  
  
  const refTopLoadingBar = useRef(null);

  useEffect(() => {
    setShow(true);
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      
      refTopLoadingBar.current.continuousStart();

      const apiUrl = 'https://techplement-wine.vercel.app/quote-of-the-day';
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.length > 0) {
        const { q, a } = data[0];
        setQuote(q);
        setAuthor(a);
        setHeadingText('Quote of the Day');
      } else {
        console.error('Error: Unable to fetch quote.');
        setQuote('');
        setAuthor('');
        setHeadingText('Error fetching quote');
      }

      
      refTopLoadingBar.current.complete();
    } catch (error) {
      console.error('Error fetching data:', error);
      setQuote('');
      setAuthor('');
      setHeadingText('Error fetching quote');
      
      refTopLoadingBar.current.complete();
    }
  };

  const fetchQuoteRandom = async () => {
    try {
      
      refTopLoadingBar.current.continuousStart();

      const apiUrl = 'https://techplement-wine.vercel.app/quote-of-the-day-random';
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.length > 0) {
        const { q, a } = data[0];
        setQuoterandom(q);
        setAuthorrandom(a);
        setRandomQuoteFetched(true); 
        setHeadingText('Random Quote'); 
      } else {
        console.error('Error: Unable to fetch quote.');
      }

    
      refTopLoadingBar.current.complete();
    } catch (error) {
      console.error('Error fetching data:', error);
      
      refTopLoadingBar.current.complete();
    }
  };

  const searchByTag = async () => {
    try {
      
      refTopLoadingBar.current.continuousStart();

      const url = `https://techplement-wine.vercel.app/quote-by-tag?tag=${searchTag}`;
      const response = await fetch(url);
      const data = await response.json();
      
      const resultsLength = data.results ? data.results.length : 0;
      
      if (resultsLength > 0) {
        const randomIndex = Math.floor(Math.random() * resultsLength);
        const randomQuote = data.results[randomIndex];
        
        setQuoterandom(randomQuote.content);
        setAuthorrandom(randomQuote.author);
        setQuoteBySearch(true);
        setHeadingText(`Random Quote by Tag: ${searchTag}`);
      } else {
        console.error('No quotes found for this tag.');
        setQuote('');
        setAuthor('');
        setQuoterandom('');
        setAuthorrandom('');
        setQuoteBySearch(false);
        setHeadingText('Quote not found for this tag');
      }

      
      refTopLoadingBar.current.complete();
    } catch (error) {
      console.error('Error fetching data:', error);
      
      refTopLoadingBar.current.complete();
    }
  };

  const handleSearchByTag = () => {
    searchByTag();
  };

  const handleRandomQuote = () => {
    fetchQuoteRandom();
  };

  const handleAudioToggle = () => {
    setAudioOn(!audioOn);
  };

  useEffect(() => {
    const audioElement = document.querySelector('audio');
    if (audioOn) {
      audioElement.play().then(() => {
        console.log('Audio playback started.');
      }).catch(error => {
        console.error('Error playing audio:', error);
      });
    } else {
      audioElement.pause();
      console.log('Audio playback paused.');
    }
  }, [audioOn]);

  return (
    <div>
      <TopLoadingBar color="#3B82F6" ref={refTopLoadingBar} className='h-30 md:h-20 sm:h-20'/> 
      <div className="relative flex flex-col h-screen bg-cover bg-no-repeat bg-left-center md:bg-center-left" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center top' }}>
        <div className="flex items-center justify-center mt-5">
          <input
            type="text"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
            placeholder="Search quote by tag (eg: life, happy...)"
            className="w-full lg:w-1/4 p-2 md:w-auto ml-2 rounded-sm"
          />
          <button onClick={handleSearchByTag} className="bg-blue-500 hover:bg-gray-700 text-white font-bold py-2 px-4 ml-2 md:ml-0 md:mt-0 md:w-auto rounded-sm">
            Search
          </button>
        </div>
        <audio src={audioFile} loop className="absolute top-4 right-4 z-10" />
        <div className='felx justify-center'>
          <button onClick={handleAudioToggle} className="absolute top-4 right-4 z-10 py-5 scale-150 px-4 mt-10 sm:text-xl lg:text-3xl" title='Trevor Morris - Hvitserks choice'>
            {audioOn ? '🔊' : '🔇'}
          </button>
        </div>
        <div className="flex flex-col items-center justify-center flex-grow relative z-0">
          <CSSTransition in={show} timeout={500} classNames="quote-slide">
            <div className='w-auto m-2 md:w-auto max-w-md rounded-md bg-gradient-to-r from-blue-300 via-blue-500 to-blue-200 p-4 md:p-1 mt-8 quote-container'>
              <div className="text-center p-4 md:p-4 shadow-xl bg-gray-800 text-white rounded-sm quote-content">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">{headingText}</h1>
                {randomQuoteFetched || quoteBySearch ? (
                  <>
                    <p className="text-lg md:text-xl">{quoterandom}</p>
                    <p className="text-base md:text-lg">- {authorrandom}</p>
                  </>
                ) : (
                  <>
                    <p className="text-lg md:text-xl">{quote}</p>
                    <p className="text-base md:text-lg">- {author}</p>
                  </>
                )}
                <button onClick={handleRandomQuote} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Get Random Quote
                </button>
              </div>
            </div>
          </CSSTransition>
        </div>
      </div>
    </div>
  );
}

export default QuoteOfTheDay;
