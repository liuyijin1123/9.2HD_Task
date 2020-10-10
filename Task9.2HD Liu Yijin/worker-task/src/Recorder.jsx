import { ReactMic } from 'react-mic';
import * as React from "react";
import Button from "@material-ui/core/Button";

export class Recorder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false
        }
    }

    startRecording = () => {
        this.setState({ record: true });
    }

    stopRecording = () => {
        this.setState({ record: false });
    }

    // onData(recordedBlob) {
    //     console.log('chunk of real-time data is: ', recordedBlob);
    // }

    onStop(recordedBlob) {
        let FileSaver = require('file-saver');
        FileSaver.saveAs(recordedBlob.blobURL, "record.webm");
        console.log('recordedBlob is: ', recordedBlob.blobURL);
    }

    render() {
        return (
            <div style={{marginTop:'3%', paddingBottom:'3%'}}>
                <div style={{paddingBottom:'2%'}}>
                <ReactMic
                    record={this.state.record}
                    onStop={this.onStop}
                    mimeType="audio/webm"
                    strokeColor="white"
                    backgroundColor="darkslategray" />
                </div>
                <Button onClick={this.startRecording} variant="contained" type="button" style={{marginLeft:'10%',marginRight:'10%'}}>Start</Button>
                <Button onClick={this.stopRecording} variant="contained" type="button" style={{marginLeft:'10%',marginRight:'10%'}}>Stop</Button>
            </div>
        );
    }
}