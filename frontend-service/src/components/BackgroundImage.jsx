import React from 'react';


const BackgroundImage = ({ imageUrl, children }) => {
  const backgroundImageStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, // Ensure the background is behind other content
    backgroundImage: imageUrl,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div style={backgroundImageStyle}>
      {children}
    </div>
  );
};

export default BackgroundImage;
