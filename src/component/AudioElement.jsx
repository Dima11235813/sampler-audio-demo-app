import React from 'react'
import AUD_CST from '../constants/audioConsts';

export const AudioElement = ({blobUrl, number}) => {
    return (
      <audio controls={"true"} id={`${AUD_CST.AUDIO_ELM}_${number}`}>
        <source src={blobUrl} type="audio/webm"></source>
        <a style={{display: "block"}} download="audio.webm" href={blobUrl}>
          download
        </a>
      </audio>
    );
  };