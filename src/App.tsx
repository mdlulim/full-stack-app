import React, { useState, useEffect } from "react";
import { IVideoSource } from "./types";
import "./App.css";
import Navbar from "./components/Navbar";
import VideoPlayer from "./components/VideoPlayer";

const App: React.FC = () => {
  const [videoSource, setVideoSource] = useState<IVideoSource>();

  useEffect(() => {
    fetch("http://localhost:4000/video") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setVideoSource(data);
      })
      .catch((error) => console.error("Error fetching video data:", error));
  }, []);

  return (
    <div className="App">
      <Navbar />
      <VideoPlayer {...videoSource} />
    </div>
  );
};

export default App;
