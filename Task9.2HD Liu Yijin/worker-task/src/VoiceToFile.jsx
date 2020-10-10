import React from "react";
import './Section.css'
import {Recorder} from "./Recorder";


export default function VoiceToFile() {
    return(<div className={'Content'} style={{textAlign:'center'}}>
        <Recorder/>
    </div>)
}