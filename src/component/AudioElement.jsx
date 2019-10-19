import React, { useEffect } from "react";
import AUD_CST from "../constants/audioConsts";
import { PlayBackRateHelper } from "./PlayBackRateHelper";

export const AudioElement = ({ blobUrl, number }) => {
  let audioElemId = `${AUD_CST.AUDIO_ELM}_${number}`;
  let thisAudioElement;
  useEffect(() => {
    thisAudioElement = document.getElementById(`${audioElemId}`);
  });
  const handle_play = () => {
    thisAudioElement.play();
  };
  const handle_pause = () => {
    thisAudioElement.pause();
  };
  const handle_playbackRate = value => {
    debugger;
    thisAudioElement.playbackRate = value;
    //TODO show duration
  };
  const handle_duration = () => {
    //TODO show duration
  };
  const handle_currentTime = () => {
    //TODO show current time
  };
  const handle_loop = () => {
    //Button for loop
    thisAudioElement.loop = true;
  };
  const handle_muted = () => {
    //silence the muted
    thisAudioElement.muted = true;
  };
  const samplerButton = {
    height: "10vh",
    width: "10vw",
    backgroundColor: "grey",
    margin: "1rem"
  };
  const playBackRateOptions = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
  const sampleName = "Sample ";
  return (
    <React.Fragment>
      <div className="sample-item-container">
        <PlayBackRateHelper
          playBackRateOptions={playBackRateOptions}
          cb={handle_playbackRate}
        />
        <div
          style={samplerButton}
          onMouseDown={handle_play}
          onMouseUp={handle_pause}
        >
          {`${sampleName}${number}`}
        </div>
      </div>
      <audio controls={false} id={audioElemId}>
        <source src={blobUrl} type="audio/webm"></source>
        <a style={{ display: "block" }} download="audio.webm" href={blobUrl}>
          download
        </a>
      </audio>
    </React.Fragment>
  );
};
