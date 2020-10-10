import React, {useContext} from "react";
import Grid from "@material-ui/core/Grid";
import ChoiceTask from "./ChoiceTask";
import SentenceLevelTask from "./SentenceLevelTask";
import DecisionMakingTask from "./DecisionMakingTask";
import {Context} from "./App";
import ImageProcessingTask from "./ImageProcessingTask";

export default function SetupTask(props) {

    const [taskSetting, setTaskSettings] = useContext(Context);

    function setSection() {
        if (taskSetting.type === 'Choice')
            return <ChoiceTask/>;
        else if (taskSetting.type === 'Decision-Making')
            return <DecisionMakingTask/>;
        else if (taskSetting.type === 'Sentence-Level')
            return <SentenceLevelTask/>;
        else if (taskSetting.type === 'Image-Processing')
            return <ImageProcessingTask
                        setFileName = {props.setFileName}
                    />;
        else
            return <div></div>;
    }

    return (
        <div className={'Content'} style={{textAlign: 'center'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h2>{props.description}</h2>
                </Grid>
            </Grid>

            {setSection()}

        </div>
    )
}