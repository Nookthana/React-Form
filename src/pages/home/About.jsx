import React, { useState } from 'react';
import AboutVideo from '../../components/video/AboutVideo';

const About = () => {
  const [url, setUrl] = useState('/video/video.mp4');
  return (
    <>
      <h1>About us</h1>
      <AboutVideo videoUrl={url} />
    </>
  );
};

export default About;
