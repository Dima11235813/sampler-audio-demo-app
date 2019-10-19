import React, {useState} from "react";
import AUD_CST from "../constants/audioConsts";

export const PlayBackRateHelper = ({ playBackRateOptions, cb }) => {
    const handleChange = (event) => {
        let floatPlaybackRate = parseFloat(event.target.value)
        cb(floatPlaybackRate)

    }
  return (
    <select onChange={handleChange}>
      {playBackRateOptions.map((rateValue, index) => {
        return <option key={index} defaultValue={AUD_CST.DEFAULT_PLAYBACK_RATE} value={rateValue}>{rateValue * 10}</option>;
      })}
    </select>
  )
}
