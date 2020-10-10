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
        } else if (name === 'option1') {
            setTaskSettings({...taskSetting, option1: value});
        } else if (name === 'option2') {
            setTaskSettings({...taskSetting, option2: value});
        } else if (name === 'option3') {
            setTaskSettings({...taskSetting, option3: value});
        }
    };

    return (
        <div>
            <h3 style={{color: 'bisque'}}>• NOTE: Choice task provides a worker options in the task and they need to select one or several options as their answer.</h3>
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
                    <h2>Option 1:</h2>
                </Grid>
                <Grid item xs={4}>
                    <TextField name="option1" label="Set Option One" onChange={handleChange} fullWidth={true} />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <h2>Option 2:</h2>
                </Grid>
                <Grid item xs={4}>
                    <TextField name="option2" label="Set Option Two" onChange={handleChange} fullWidth={true} />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <h2>Option 3:</h2>
                </Grid>
                <Grid item xs={4}>
                    <TextField name="option3" label="Set Option Three" onChange={handleChange} fullWidth={true} />
                </Grid>
            </Grid>
        </div>
    )
}