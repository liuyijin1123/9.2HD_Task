import React, {useContext} from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField/TextField";

import './Section.css'
import {Context} from "./App";


export default function Requirement(props) {

    const [taskSetting, setTaskSettings] = useContext(Context);
    const [state, setState] = React.useState('No');

    const handleToggle = () => {
        if (state === 'Yes') {
            setState('No');
            setTaskSettings({...taskSetting, require: 'No'});
        } else {
            setState('Yes');
            setTaskSettings({...taskSetting, require: 'Yes'});
        }
    };

    const handleChange = (event) => {

        const value = event.target.value;
        const name = event.target.name;

        if (name === 'reward') {
            setTaskSettings({...taskSetting, reward: value});
        } else if (name === 'worker_number') {
            setTaskSettings({...taskSetting, number: value});
        }
    };

    return (
        <div className={'Content'}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <h2>{props.require}</h2>
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel
                        control={<Switch onChange={handleToggle}/>}
                        label={state}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <h2>{props.reward}</h2>
                </Grid>
                <Grid item xs={4}>
                    <TextField name="reward" label="Set Response Reward" onChange={handleChange} fullWidth={true} />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <h2>{props.number}</h2>
                </Grid>
                <Grid item xs={4}>
                    <TextField name="worker_number" label="Workers Needed" onChange={handleChange} fullWidth={true} />
                </Grid>
            </Grid>
        </div>
    )
}