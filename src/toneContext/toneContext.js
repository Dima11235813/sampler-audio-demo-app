import AUD_CST from "../constants/audioConsts";

//https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createScriptProcessor
export const Main = function() {
  let recorders = [];
  let chunks = [];
  let audioElements = [];
  // const handleSuccess = function (stream) {
  //     const context = new AudioContext();
  //     const source = context.createMediaStreamSource(stream);
  //     const processor = context.createScriptProcessor(1024, 1, 1);

  //     source.connect(processor);
  //     processor.connect(context.destination);

  //     processor.onaudioprocess = function (e) {
  //         // Do something with the data, e.g. convert it to WAV
  //         console.log(e.inputBuffer);
  //     };
  // };

  // navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  //     .then(handleSuccess);

  // appends an audio element to playback and download recording
  // function createAudioElement(blobUrl, mediaRecorderNumber) {
  //   // debugger;
  //   const soundCountrols = document.getElementById("sound-controls-containter");
  //   let downloadEl = document.createElement("a");
  //   downloadEl.style = "display: block";
  //   downloadEl.innerHTML = "download";
  //   downloadEl.download = "audio.webm";
  //   downloadEl.href = blobUrl;
  //   //create audio element
  //   const audioEl = document.createElement("audio");
  //   audioElements.push(audioEl);
  //   audioEl.controls = true;
  //   audioEl.id = `${AUD_CST.AUDIO_ELM}_${recorders.length + 1}`;

  //   // debugger
  //   //create source
  //   const sourceEl = document.createElement("source");
  //   sourceEl.src = blobUrl;
  //   sourceEl.type = "audio/webm";
  //   // sourceEl.name = `Meida Recorder ${mediaRecorderNumber}`;
  //   audioEl.appendChild(sourceEl);
  //   //create a container for sample item
  //   let sampleItemContainer = document.createElement("div");
  //   sampleItemContainer.appendChild(audioEl);
  //   sampleItemContainer.appendChild(downloadEl);

  //   soundCountrols.appendChild(sampleItemContainer);
  //   return audioEl;
  // }

  const checkIfCanInteract = () => {
    // return true
    return recorders.length > 0;
  };
  return {
    stop: () => {
      if (recorders[recorders.length - 1].state !== "inactive") {
        recorders[recorders.length - 1].stop();
      }
    },
    start: cb => {
      // request permission to access audio stream
      return -1;
    },
    recorders: recorders,
    chunks: chunks,
    audioElements: audioElements
  };
};
