//https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createScriptProcessor
export const main = (function() {
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
  function createAudioElement(blobUrl, mediaRecorderNumber) {
    // debugger;
    const soundCountrols = document.getElementById("sound-controls-containter");
    let downloadEl = document.createElement("a");
    downloadEl.style = "display: block";
    downloadEl.innerHTML = "download";
    downloadEl.download = "audio.webm";
    downloadEl.href = blobUrl;
    //create audio element
    const audioEl = document.createElement("audio");
    audioElements.push(audioEl);
    audioEl.controls = false;
    //create source
    const sourceEl = document.createElement("source");
    sourceEl.src = blobUrl;
    sourceEl.type = "audio/webm";
    // sourceEl.name = `Meida Recorder ${mediaRecorderNumber}`;
    audioEl.appendChild(sourceEl);
    //create a container for sample item
    let sampleItemContainer = document.createElement("div");
    sampleItemContainer.appendChild(audioEl);
    sampleItemContainer.appendChild(downloadEl);

    soundCountrols.appendChild(sampleItemContainer);
  }

  const createMediaRecorder = () => {
    // request permission to access audio stream
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        // debugger;
        // store streaming data chunks in array
        // create media recorder instance to initialize recording
        let newMediaRec = new MediaRecorder(stream);
        recorders.push(newMediaRec);
        let currentSamplerItem = recorders.length - 1;
        console.log(`Created new media recorder #${currentSamplerItem}`);
        chunks[currentSamplerItem] = [];
        let currentChunksToPushTo = chunks[currentSamplerItem];
        // function to be called when data is received
        recorders[recorders.length - 1].ondataavailable = e => {
          // add stream data to chunks
          currentChunksToPushTo.push(e.data);
          console.log(`Pushing chunks`);
          console.log(e.data);
          // if recorder is 'inactive' then recording has finished
          if (recorders[recorders.length - 1].state == "inactive") {
            // convert stream data chunks to a 'webm' audio format as a blob
            const blob = new Blob(chunks[currentSamplerItem], {
              type: "audio/wav"
            });
            // convert blob to URL so it can be assigned to a audio src attribute
            createAudioElement(URL.createObjectURL(blob), recorders.length - 1);
          }
        };
        if (currentSamplerItem !== 0) {
          recorders[currentSamplerItem].start();
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  const checkIfCanInteract = () => {
    return recorders.length > 0;
  };
  createMediaRecorder();
  return {
    stop: () => {
      if (checkIfCanInteract()) {
        if (recorders[recorders.length - 1].state !== "inactive") {
          recorders[recorders.length - 1].stop();
        }
      }
    },
    start: () => {
      if (checkIfCanInteract()) {
        // start recording with 1 second time between receiving 'ondataavailable' events
        let currentSamplerItem = recorders.length - 1;
        if (currentSamplerItem !== 0) {
          createMediaRecorder();
        } else {
          recorders[currentSamplerItem].start();
        }
      } else {
        return -1;
      }
    },
    recorders: recorders
  };
})();
