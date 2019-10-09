export const main = function () {
    let recorder
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
    function createAudioElement(blobUrl) {
        const soundCountrols = document.getElementById("sound-controls-containter")
        let downloadEl = document.createElement('a');
        downloadEl.style = 'display: block';
        downloadEl.innerHTML = 'download';
        downloadEl.download = 'audio.webm';
        downloadEl.href = blobUrl;
        const audioEl = document.createElement('audio');
        audioEl.controls = true;
        const sourceEl = document.createElement('source');
        sourceEl.src = blobUrl;
        sourceEl.type = 'audio/webm';
        audioEl.appendChild(sourceEl);
        soundCountrols.appendChild(audioEl);
        soundCountrols.appendChild(downloadEl);
    }

    // request permission to access audio stream
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        // store streaming data chunks in array
        const chunks = [];
        // create media recorder instance to initialize recording
        recorder = new MediaRecorder(stream);
        // function to be called when data is received
        recorder.ondataavailable = e => {
            // add stream data to chunks
            chunks.push(e.data);
            // if recorder is 'inactive' then recording has finished
            if (recorder.state == 'inactive') {
                // convert stream data chunks to a 'webm' audio format as a blob
                const blob = new Blob(chunks, { type: 'audio/webm' });
                // convert blob to URL so it can be assigned to a audio src attribute
                createAudioElement(URL.createObjectURL(blob));
            }
        };
    }).catch(console.error);
    return {
        stop: () => {
            // this will trigger one final 'ondataavailable' event and set recorder state to 'inactive'
            recorder.stop()
        },
        start: () => {
            // start recording with 1 second time between receiving 'ondataavailable' events
            recorder.start();
        }
    }
}()