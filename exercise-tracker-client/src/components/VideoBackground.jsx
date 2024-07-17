import React from 'react';

const VideoBackground = () => {
  return (
    <video className="background-video" autoPlay loop muted>
      <source src="/videos/HOMEPage.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoBackground;
