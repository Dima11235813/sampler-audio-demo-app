import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import AUD_CST from "./constants/audioConsts";
import { AudioElement } from "./component/AudioElement";

function App() {
  let newMediaRec = useRef(null)
  const [recording, setRecording] = useState(false);
  const [blobUrls, addBlobUrl] = useState([]);
  const gotUserMediaCb = stream => {
    newMediaRec.current = new MediaRecorder(stream);
    let mediaRec = newMediaRec.current
    console.log(`Created new media recorder #${newMediaRec}`);
    let tempChunks = [];
    mediaRec.ondataavailable = e => {
      // add stream data to chunks
      tempChunks.push(e.data);
      console.log(`Pushing chunks`);
      console.log(e.data);
      // if recorder is 'inactive' then recording has finished
      if (mediaRec.state == "inactive") {
        // convert stream data chunks to a 'webm' audio format as a blob
        const blob = new Blob(tempChunks, {
          type: "audio/wav"
        });
        let blobUrl = URL.createObjectURL(blob);
        addBlobUrl([...blobUrls, blobUrl]);
      }
    };
  };
  const createRecorder = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        gotUserMediaCb(stream);
      })
      .catch(err => {
        console.log("fail to get user media");
      });
  };
  useEffect(() => {
      createRecorder();
    }, []);
    useEffect(() => {
      console.log("media recorder")
      console.log(newMediaRec)
      let mediaRec = newMediaRec.current
    if (mediaRec && mediaRec.state === "inactive") {
      console.log("Calling start on media recorder");
      mediaRec.start();
    } else if (mediaRec && mediaRec.state === "recording") {
      console.log("Calling stop on media creator");
      mediaRec.stop();
    }
  }, [recording]);
  return (
    <div className="App">
      <div id="sound-controls-containter">
        <button
          className={recording ? "recording" : ""}
          onMouseDown={() => setRecording(true)}
          onMouseUp={() => setRecording(false)}
        >●
        </button>
        <div id="sound-controls-containter">
          {blobUrls.map((blobUrl, index) => (
            <AudioElement key={index} blobUrl={blobUrl} number={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
