import React, {useContext} from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";

import './Section.css'
import {Context} from "./App";

export default function SelectTask(props) {

    const [taskSetting, setTaskSettings] = useContext(Context);

    return (
        <div className={'Content'}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <h2>{props.text}</h2>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth={true}>
                        <InputLabel id="demo-simple-select-label">Choose a type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            name="task_type"
                            value={props.task_type_value}
                        >
                            <MenuItem value={'Choice'} onClick={() => setTaskSettings({...taskSetting, type: 'Choice'})}>Choice Task</MenuItem>
                            <MenuItem value={'Decision-Making'} onClick={() => setTaskSettings({...taskSetting, type: 'Decision-Making'})}>Decision-Making Task</MenuItem>
                            <MenuItem value={'Sentence-Level'} onClick={() => setTaskSettings({...taskSetting, type: 'Sentence-Level'})}>Sentence-Level Task</MenuItem>
                            <MenuItem value={'Image-Processing'} onClick={() => setTaskSettings({...taskSetting, type: 'Image-Processing'})}>Image-Processing Task</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    )
}