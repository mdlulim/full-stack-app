import React, { useState, useEffect, useRef } from "react";
import { IVideoSource } from "../types";
import videojs from "video.js";

import "video.js/dist/video-js.css";
import "./VideoPlayer.css";

const VideoPlayer = (props: IVideoSource) => {
  const { url, source, title } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [player, setPlayer] = useState<any>();
  const videoNodeId: string = "videojs-player";
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (source && videoRef.current) {
      const videoJsOptions = {
        controls: true,
        muted: true,
        sources: [
          {
            src: url,
            type: `video/${source.toLowerCase()}`,
          },
        ],
      };
      setPlayer(
        videojs(videoRef.current, videoJsOptions).ready(function () {
          console.log("Player is Ready");
        })
      );
    }
  }, [source]);

  useEffect(() => {
    return function cleanup() {
      if (player) {
        player.dispose();
      }
    };
  });

  return (
    <div className="video-container">
      <video id={videoNodeId} ref={videoRef} className="video-js vjs-big-play-centered" />
      <div className="text-card">
        <h1 id="video-title">{title}</h1>
        <h2 id="video-progress">Progress: {progress}s</h2>
      </div>
    </div>
  );
};

export default VideoPlayer;
