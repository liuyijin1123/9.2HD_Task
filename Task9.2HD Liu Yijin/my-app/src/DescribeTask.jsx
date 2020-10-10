import React, {useContext} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Context} from "./App";

export default function DescribeTask(props) {

    const [taskSetting, setTaskSettings] = useContext(Context);

    const handleChange = (event) => {

        const value = event.target.value;
        const name = event.target.name;

        if (name === 'title') {
            setTaskSettings({...taskSetting, title: value});
        } else if (name === 'description') {
            setTaskSettings({...taskSetting, description: value});
        } else if (name === 'date') {
            setTaskSettings({...taskSetting, date: value});
        }
    };

    return (
        <div className={'Content'}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <h2>{props.title}</h2>
                </Grid>
                <Grid item xs={4}>
                    <TextField name="title" label="Enter Task Title" onChange={handleChange} fullWidth={true} />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <h2>{props.description}</h2>
                </Grid>
                <Grid item xs={4}>
                    <TextField name="description" label="Enter Task Description" onChange={handleChange} fullWidth={true} />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <h2>{props.date}</h2>
                </Grid>
                <Grid item xs={4}>
                    <TextField name="date" label="Format: YYYY/MM/DD" onChange={handleChange} fullWidth={true} />
                </Grid>
            </Grid>
        </div>
    )

}