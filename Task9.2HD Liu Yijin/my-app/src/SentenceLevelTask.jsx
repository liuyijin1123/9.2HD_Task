import React, {useContext} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import {Context} from "./App";

export default function () {

    const [taskSetting, setTaskSettings] = useContext(Context);

    const handleChange = (event) => {

        const value = event.target.value;
        const name = event.target.name;

        if (name === 'question') {
            setTaskSettings({...taskSetting, question: value});
        }
    };

    return (
        <div>
            <h3 style={{color: 'bisque'}}>• NOTE: Sentence-level task asks a worker to provide sentences as answers like translation.</h3>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <h2>Enter Your Question</h2>
                </Grid>
                <Grid item xs={4}>
                    <TextField name="question" label="Describe Your Problem in Detail" onChange={handleChange} fullWidth={true} multiline={true} rows={6} />
                </Grid>
            </Grid>
        </div>
    )
}