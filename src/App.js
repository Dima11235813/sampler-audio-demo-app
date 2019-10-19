import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AUD_CST from "./constants/audioConsts";
import { AudioElement } from "./component/AudioElement";

function App() {
  let newMediaRec
  const [blobUrls, addBlobUrl] = useState([]);
  const gotUserMediaCb = stream => {
    newMediaRec = new MediaRecorder(stream);
    console.log(`Created new media recorder #${newMediaRec}`);
    let tempChunks = []
    newMediaRec.ondataavailable = e => {
      // add stream data to chunks
      tempChunks.push(e.data);
      console.log(`Pushing chunks`);
      console.log(e.data);
      // if recorder is 'inactive' then recording has finished
      if (newMediaRec.state == "inactive") {
        // convert stream data chunks to a 'webm' audio format as a blob
        const blob = new Blob(tempChunks, {
          type: "audio/wav"
        });
        let blobUrl = URL.createObjectURL(blob);
        addBlobUrl([...blobUrls, blobUrl]);
      }
    };
    newMediaRec.start()
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
  const handleStartRecording = () => {
    if(!newMediaRec){
      createRecorder()
    }else{
      newMediaRec.start()
    }
  }
  const handleStopRecording = () => {
    newMediaRec.stop();
  };
  return (
    <div className="App">
      <div id="sound-controls-containter">
        <button onClick={handleStartRecording}>Start</button>
        <button onClick={handleStopRecording}>Stop</button>
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
