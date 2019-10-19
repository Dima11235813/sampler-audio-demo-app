import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { main } from "./toneContext/toneContext";

function App() {
  // let updateSampleItems = useState()
  // const handleStartRecording = () => {
  //   // debugger;
  //   main.start()
  // };
  // debugger;
  return (
    <div className="App">
      <div id="sound-controls-containter">
        <button onClick={main.start}>Start</button>
        <button onClick={main.stop}>Stop</button>
      </div>
    </div>
  );
}

export default App;
