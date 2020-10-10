// App
/*
import React, {useState} from 'react';
import './App.css';
import SectionHeader from "./SectionHeader";
import SelectTask from "./SelectTask";

import './Section.css'
import DescribeTask from "./DescribeTask";
import Requirement from "./Requirement";
import SetupTask from "./SetupTask";
import Button from "@material-ui/core/Button";

export const Context = React.createContext({});

function App() {

    const [taskSetting, setTaskSettings] = useState({

        type: '',
        title: '',
        description: '',
        date: '',
        question: '',
        option1: '',
        option2: '',
        option3: '',
        require: '',
        reward: '',
        number: '',
        HASH: '',
        PicName: '',

    });

    const [fileName, setFileName] = useState('');

    const handleClick = () => {
        fetch('http://localhost:8080/adding_task', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                type: taskSetting.type,
                title: taskSetting.title,
                description: taskSetting.description,
                date: taskSetting.date,
                question: taskSetting.question,
                option1: taskSetting.option1,
                option2: taskSetting.option2,
                option3: taskSetting.option3,
                require: taskSetting.require,
                reward: taskSetting.reward,
                number: taskSetting.number,
                HASH: taskSetting.HASH,
                PicName: fileName
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <Context.Provider value={[taskSetting, setTaskSettings]}>
            <div className={'Frame'}>
                <SectionHeader
                  text = 'New Requester Task'
                />
                <SelectTask
                  text = 'Select Task Type'
                />
                <SectionHeader
                    text = 'Describe Your Task to Workers'
                />
                <DescribeTask
                    title = 'Title'
                    description = 'Description'
                    date = 'Expiry Date'
                />
                <SectionHeader
                    text = 'Setting Up Your Task'
                />
                <SetupTask
                    description = 'Before Setup Your Work, Please Choose A Task Type'
                    setFileName = {setFileName}
                />
                <SectionHeader
                    text = 'Worker Requirement'
                />
                <Requirement
                    require = 'Require Master Workers'
                    reward = 'Reward Per Response'
                    number = 'Number Of Workers'
                />
                <div className={'Button'} style={{textAlign: 'center'}}>
                    <Button variant="contained" onClick={handleClick}><h3>Save and Submit</h3></Button>
                </div>
            </div>
        </Context.Provider>
    );
}

export default App;


 */



// SectionHeader
/*

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
 */




// SelectTask
/*

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
 */



// DescribeTask
/*

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
 */




// SetupTask
/*

import React, {useContext} from "react";
import Grid from "@material-ui/core/Grid";
import ChoiceTask from "./ChoiceTask";
import SentenceLevelTask from "./SentenceLevelTask";
import DecisionMakingTask from "./DecisionMakingTask";
import {Context} from "./App";

export default function SetupTask(props) {

    const [taskSetting, setTaskSettings] = useContext(Context);

    function setSection() {
        if (taskSetting.type === 'Choice')
            return <ChoiceTask/>;
        else if (taskSetting.type === 'Decision-Making')
            return <DecisionMakingTask/>;
        else if (taskSetting.type === 'Sentence-Level')
            return <SentenceLevelTask/>;
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
 */



// ImageProcessingTask
/*
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
            let imageData = new FormData();
            imageData.append('file', event.target.files[0]);

            fetch('http://114.116.236.217:9223/api/upload',{
                method: 'post',
                body: imageData,
            })
                .then(response => response.text())
                .then((body) => {
                    setTaskSettings({...taskSetting, HASH: JSON.parse(body).HASH});
                });
            setFilePath(URL.createObjectURL(event.target.files[0]));
            props.setFileName(event.target.files[0].name);
        }
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
 */



// ChoiceTask
/*

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
 */



// Decision-Making Task
/*

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
            <h3 style={{color: 'bisque'}}>• NOTE: Decision-making task ask a worker to provide True/False as their answers.</h3>
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
 */


// Sentence-Level Task
/*

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
 */



// Requirement
/*

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
 */


// CSS
/*

.Frame {
    background-color: darkgrey;
}
.Header {
    background-color: bisque;
    font-family: Calibri, monospace;
    margin-bottom: 1%;
    padding-left: 1%;
}

.Content {
    background-color: darkgrey;
    color: white;
    font-family: Calibri, monospace;
    margin-bottom: 1%;
    padding-left: 1%;
}

.Button {
    margin-top: 2%;
    padding-bottom: 2%;
}
 */




// taskModel.js
/*
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

    type: String,
    title: String,
    description: String,
    date: String,
    question: String,
    optionOne: String,
    optionTwo: String,
    optionThree: String,
    require: String,
    reward: String,
    number: String,
    HASH: String,
    PicName: String,

});

module.exports  =  mongoose.model("Tasks", userSchema)
 */



// router.js
/*
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const User = require("./taskModel");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.send('Server running successfully!');
});

app.get('/task_data', (req,res)=>{

    User.find({
    }, function (err, data) {
        if(err) throw err;
        if(data) {
            res.end(JSON.stringify(data));
        }else{
            const returnJSON = {"info": "Fail to retrieve data!"};
            res.end(returnJSON);
        }
    });
});

mongoose.connect("mongodb+srv://Liu:WXYvQrfJ7Os3kyG7@cluster0.jjc6o.mongodb.net/users?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

app.post('/adding_task', (req,res)=>{

    const type = req.body.type;
    const title = req.body.title;
    const description = req.body.description;
    const date = req.body.date;
    const question = req.body.question;
    const optionOne = req.body.option1;
    const optionTwo = req.body.option2;
    const optionThree = req.body.option3;
    const require = req.body.require;
    const reward = req.body.reward;
    const number = req.body.number;
    const HASH = req.body.HASH;
    const PicName = req.body.PicName;

    let user=new User({
            type: type,
            title: title,
            description: description,
            date: date,
            question: question,
            optionOne: optionOne,
            optionTwo: optionTwo,
            optionThree: optionThree,
            require: require,
            reward: reward,
            number: number,
            HASH: HASH,
            PicName: PicName

        }
    );
    user
        .save()
        .catch((err) => console.log(err));

    if (res.statusCode === 200) {
        res.json({"info": "The Task has been added!"});
    }
    else {
        showMessage("Fail to add the Task!", res);
    }

});

function showMessage(message,res){
    let result=`<script>alert('${message}');history.back()</script>`;
    res.send(result)
}


app.listen(8080, ()=>{
    console.log("Server is running successfully!")
});
 */





// TaskCard
/*
import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 445,
        minWidth: 300,
        marginLeft: '10%',
        marginRight: '10%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

function TaskCard(props) {

    const classes = useStyles();

    const [expand, changeExpand] = useState(true);
    const handleClick = (event) => {

        console.log(props.image);

        if (expand === true)
            changeExpand(false);
        else
            changeExpand(true);
    };

    return (
        <div onClick={handleClick}>
            <Card className={classes.root}>
                <CardHeader
                    title={props.title}
                    subheader={props.type}
                />
                <CardMedia
                    className={classes.media}
                    image={props.image}
                    title="Image"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.expiry}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" hidden={expand}>
                        {props.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" hidden={expand}>
                        {props.question}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" hidden={expand}>
                        {props.require}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" hidden={expand}>
                        {props.reward}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" hidden={expand}>
                        {props.number}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
export default TaskCard;

 */




// TaskSection
/*
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

        fetch('http://localhost:8080/task_data',{
            method: 'get',
        })
            .then(response => response.text())
            .then((body) => {
                setData(JSON.parse(body));
            });
    };

    function getImageURL(data) {
        let image = 'http://node.wanxutao.space/api/download?HASH=' + data.HASH + '&' + 'fileName=' + data.PicName;
        return image;
    }

    const handleDelete = () => {
        for (let index in data) {
            if (data[index].title === filter.deleteByTitle)
                data[index].title = 'delete';
            break;
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
                                    image = {getImageURL(value)}
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

    console.log(differenceInTime / (1000 * 3600 * 24));
    return (differenceInTime / (1000 * 3600 * 24));

}

 */