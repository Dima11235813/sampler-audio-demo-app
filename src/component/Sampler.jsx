import React, { useState, useEffect } from "react";
import { AudioElement } from "./AudioElement";

export const Sampler = ({ blobUrls, newMediaRec }) => {
  const [recording, setRecording] = useState(false);
  //every time user clicks record button, capture another audio blob
  useEffect(() => {
    console.log("media recorder");
    console.log(newMediaRec);
    let mediaRec = newMediaRec.current;
    if (mediaRec && mediaRec.state === "inactive") {
      console.log("Calling start on media recorder");
      mediaRec.start();
    } else if (mediaRec && mediaRec.state === "recording") {
      console.log("Calling stop on media creator");
      mediaRec.stop();
    }
  }, [recording]);

  return (
    <div id="sound-controls-containter">
      <button
        className={recording ? "recording" : ""}
        onMouseDown={() => setRecording(true)}
        onMouseUp={() => setRecording(false)}
      >
        ●
      </button>
      <div id="audio-elements-containter">
        {blobUrls.map((blobUrl, index) => (
          <AudioElement key={index} blobUrl={blobUrl} number={index + 1} />
        ))}
      </div>
    </div>
  );
};
