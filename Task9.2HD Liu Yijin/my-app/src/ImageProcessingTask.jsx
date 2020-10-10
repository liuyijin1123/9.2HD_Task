import React, {useContext, useState} from "react";
import {Context} from "./App";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


export default function ImageProcessingTask(props) {

    const [taskSetting, setTaskSettings] = useContext(Context);

    const [filePath, setFilePath] = useState('');

    const handleChange = (event) => {

        const value = event.target.value;
        const name = event.target.name;

        if (name === 'question') {
            setTaskSettings({...taskSetting, question: value});
        }

        if (name === 'upload') {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", function () {
                // convert image file to base64 string
                setFilePath(reader.result);
                setTaskSettings({...taskSetting, picBase64: reader.result});
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }
        }
        // if (name === 'upload') {
        //     let imageData = new FormData();
        //     imageData.append('file', event.target.files[0]);
        //
        //     fetch('http://114.116.236.217:9223/api/upload',{
        //         method: 'post',
        //         body: imageData,
        //     })
        //         .then(response => response.text())
        //         .then((body) => {
        //             setTaskSettings({...taskSetting, HASH: JSON.parse(body).HASH});
        //         });
        //     setFilePath(URL.createObjectURL(event.target.files[0]));
        //     props.setFileName(event.target.files[0].name);
        // }
    };

    return (
        <div>
            <h3 style={{color: 'bisque'}}>• NOTE: Image-processing task asks a worker to tag objects found in an image.</h3>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <h2>Enter Your Question</h2>
                </Grid>
                <Grid item xs={4}>
                    <TextField name="question" label="Describe Your Problem in Detail" onChange={handleChange} fullWidth={true} multiline={true} rows={6} />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <h2>Select The Image</h2>
                </Grid>
                <Grid item xs={4}>
                    <input style={{display: 'none'}}
                           name = 'upload'
                           accept="image/*"
                           id="contained-button-file"
                           multiple
                           type="file"
                           onChange={handleChange}
                    />
                    <label htmlFor="contained-button-file">
                        <Button
                            style={{marginTop: '6%'}}
                            variant="contained"
                            component="span"
                            color="default"
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload
                        </Button>
                    </label>
                </Grid>
                <Grid item xs={3}>
                    <img src={filePath} style={{marginTop: '6%'}} width={'100%'} height={200}/>
                </Grid>
            </Grid>
        </div>
    );
}