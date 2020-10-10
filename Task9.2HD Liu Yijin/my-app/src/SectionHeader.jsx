import React from "react";
import Grid from '@material-ui/core/Grid';
import './Section.css'

export default function SectionHeader(props) {
    return(
        <div className={'Header'}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h1>{props.text}</h1>
                </Grid>
            </Grid>
        </div>
    )
}