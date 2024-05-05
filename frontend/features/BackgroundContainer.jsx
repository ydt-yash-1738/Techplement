// BackgroundContainer.jsx
import React from 'react';

function BackgroundContainer({ backgroundImage, children }) {
  return (
    <div className="flex justify-center items-center h-screen" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center top' }}>
      {children}
    </div>
  );
}

export default BackgroundContainer;
