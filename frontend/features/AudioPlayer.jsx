// AudioPlayer.jsx
import React from 'react';

function AudioPlayer({ audioFile, audioOn, handleAudioToggle }) {
  return (
    <>
      <audio src={audioFile} loop />
      {audioOn ? (
        <button onClick={handleAudioToggle} className="absolute top-4 right-4 z-1 py-2 px-4 rounded sm:text-xl lg:text-3xl" title='Trevor Morris - Hvitserks choice'>
          🔊
        </button>
      ) : (
        <button onClick={handleAudioToggle} className="absolute top-4 right-4 z-1 py-2 px-4 rounded sm:text-xl lg:text-3xl" title='Trevor Morris - Hvitserks choice'>
          🔇
        </button>
      )}
    </>
  );
}

export default AudioPlayer;
