import React, {useContext, useState} from "react";

import './Section.css'
import Grid from "@material-ui/core/Grid";
import TaskCard from "./TaskCard";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {Filter} from "./App";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';

export default function TaskSection(props) {

    const [filter, setFilter] = useContext(Filter);
    const [data, setData] = useState([]);

    const handleClick = () => {

        console.log('The server is sending GET request.');
        console.log('Please wait for a while......')
        fetch('http://localhost:8080/task_data',{
            method: 'get',
        })
            .then(response => response.text())
            .then((body) => {
                setData(JSON.parse(body));
                console.log(data[0])
                console.log('Data retrieved successfully.')
            });
    };

    // function getImageURL(data) {
    //     let image = 'http://node.wanxutao.space/api/download?HASH=' + data.HASH + '&' + 'fileName=' + data.PicName;
    //     return image;
    // }

    const handleDelete = () => {
        for (let index in data) {
            if (data[index].title === filter.deleteByTitle) {
                console.log(data[index].title)
                data[index].title = 'delete';
                break;
            }
        }
        setFilter({...filter, delete: 'delete'});
    };

    return (
        <div className={'Content'}>
            <Grid container spacing={6}>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs>
                    <Button
                        style={{marginTop: '6%'}}
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                    >
                        Load Tasks
                    </Button>
                </Grid>
                <Grid item xs={0.5}>
                    <h2>Filter: </h2>
                </Grid>
                <Grid item xs>
                    <FormControl fullWidth={true}>
                        <InputLabel id="demo-simple-select-label">Filter By Expiry Date</InputLabel>
                        <Select labelId="demo-simple-select-label">
                            <MenuItem value={'Expired'} onClick={() => setFilter({...filter, filterByDate: 0})}>Expired</MenuItem>
                            <MenuItem value={'Less than 1 day'} onClick={() => setFilter({...filter, filterByDate: 1})}>Less than 1 day</MenuItem>
                            <MenuItem value={'Less than 3 day'} onClick={() => setFilter({...filter, filterByDate: 3})}>Less than 3 day</MenuItem>
                            <MenuItem value={'Less than 1 week'} onClick={() => setFilter({...filter, filterByDate: 7})}>Less than 1 week</MenuItem>
                            <MenuItem value={'Less than 1 month'} onClick={() => setFilter({...filter, filterByDate: 30})}>Less than 1 month</MenuItem>
                            <MenuItem value={'Less than 1 year'} onClick={() => setFilter({...filter, filterByDate: 365})}>Less than 1 year</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs>
                    <TextField label="Filter By Task Title" onChange={(event) => setFilter({...filter, filterByTitle: event.target.value})} fullWidth={true} />
                </Grid>
                <Grid item xs>
                    <TextField label="Enter A Title To Delete Task" onChange={(event) => setFilter({...filter, deleteByTitle: event.target.value})} fullWidth={true} />
                </Grid>
                <Grid item xs>
                    <Button
                        style={{marginTop: '6%'}}
                        variant="contained"
                        component="span"
                        color="secondary"
                        name='delete'
                        startIcon={<DeleteIcon />}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
            <Grid container spacing={6}>
                <Grid item xs>
                    <Grid container justify="center">
                        {(data.filter(item => (calculateExpiry(item.date)<=filter.filterByDate && item.title !== filter.filterByTitle && item.title!==filter.delete))).map((value) => (
                            <Grid key={value} item>
                                <TaskCard
                                    title = {value.title}
                                    type = {value.type + ' Task'}
                                    image = {value.picBase64}
                                    expiry = {'Expiry Date: ' + value.date}
                                    description = {value.description}
                                    question = {'Question: ' + value.question}
                                    require = {'Master Worker: ' + value.require}
                                    reward = {'Reward per response: ' + value.reward}
                                    number = {'Number of Workers: ' + value.number}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

function  calculateExpiry(sDate2) {

    let d = new Date();
    let date1 = new Date(d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate());
    let date2 = new Date(sDate2);
    let differenceInTime = date2.getTime() - date1.getTime();

    return (differenceInTime / (1000 * 3600 * 24));

}