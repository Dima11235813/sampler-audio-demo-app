import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import AUD_CST from "./constants/audioConsts";
import { AudioElement } from "./component/AudioElement";
import { Sampler } from "./component/Sampler";

function App() {
  let newMediaRec = useRef(null);
  const [blobUrls, addBlobUrl] = useState([]);

  const gotUserMediaCb = stream => {
    newMediaRec.current = new MediaRecorder(stream);
    let mediaRec = newMediaRec.current;
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
        updateBlobs(blob);
      }
    };
  };
  const updateBlobs = blob => {
    let blobUrl = URL.createObjectURL(blob);
    addBlobUrl([...blobUrls, blobUrl]);
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

  //create the recorder as if on component did mount
  useEffect(() => {
    createRecorder();
  }, []);

  return (
    <div className="App">
      <Sampler blobUrls={blobUrls} newMediaRec={newMediaRec} />
    </div>
  );
}

export default App;
