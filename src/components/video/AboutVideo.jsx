import React from 'react';

const AboutVideo = ({ videoUrl }) => {
  const appStyle = {
    position: "relative", 
    width: "100%",
    height: "100vh", 
    overflow: "hidden", 
  };

  const contentStyle = {
    position: "relative", 
    zIndex: 1, 
    color: "white",
    textAlign: "center",
    padding: "20px",
  };

  return (
    <div className="App" style={appStyle}>
      <video autoPlay muted loop >
      <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
};

export default AboutVideo;
