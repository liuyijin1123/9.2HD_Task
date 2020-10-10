import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from "@material-ui/core/Grid";
import './Section.css'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import EmojiEmotionsRoundedIcon from '@material-ui/icons/EmojiEmotionsRounded';
import SentimentDissatisfiedRoundedIcon from '@material-ui/icons/SentimentDissatisfiedRounded';

export default function VoiceToText() {

    const [data, setData] = useState({
        convertText: '...',
        status: 'Waiting for Upload',
        fileName: '',
        translation: '...',
        positive: 5,
        negative: 5
    });

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
            maxWidth: 500
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    });
    const classes = useStyles();

    const handleClick = () => {
        setData({
            convertText: '...',
            status: 'Waiting for Upload',
            fileName: '',
            translation: '...',
            positive: 5,
            negative: 5
        })
    }

    const handleChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            // convert image file to base64 string
            console.log(reader.result)

            fetch('http://localhost:8080/adding_soundFile', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    soundBase64: reader.result
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.info === 'Fail to convert sound to text!') {
                        setData({...data,fileName: '', status: 'Error', convertText: 'Please submit a wav file and check if the file is correct'});
                    } else {
                        setData({...data,fileName: '', status: 'Complete', convertText: data.convertText,
                            translation: data.translation,
                            positive: data.positive,
                            negative: data.negative
                        });
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }, false);

        if (file) {
            reader.readAsDataURL(file);
            setData({...data, fileName: file.name, status: 'File received, processing: '});
        }
    };

    return (<div className={'Content'}>
        <Grid container spacing={6}>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={1}>
                <input style={{display: 'none'}}
                       name = 'upload'
                       accept="*"
                       id="contained-button-file"
                       multiple
                       type="file"
                       onChange={handleChange}
                />
                <label htmlFor="contained-button-file">
                    <Button
                        style={{marginBottom: '2%'}}
                        variant="contained"
                        component="span"
                        color="default"
                        startIcon={<CloudUploadIcon />}
                        onClick={handleClick}
                    >
                        Upload
                    </Button>
                </label>
            </Grid>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {data.status+data.fileName}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Text is converted by AI
                        </Typography>
                        <Typography variant="body2" component="p">
                            {data.convertText}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary" style={{marginTop:'3%'}}>
                            AI Chinese translation
                        </Typography>
                        <Typography variant="body2" component="p">
                            {data.translation}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        <Grid container spacing={0} style={{marginTop:'3%', marginBottom:'3%'}}>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs>
                <h2>NLP Emotion Analysis:</h2>
            </Grid>
        </Grid>
        <Grid container spacing={0} style={{marginBottom:'3%'}}>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={data.positive} style={{backgroundColor:'darksalmon', textAlign:'center', paddingBottom:'1%'}}>
                <h3>Positive</h3><EmojiEmotionsRoundedIcon />
            </Grid>
            <Grid item xs={data.negative} style={{backgroundColor:'darkblue', textAlign:'center', paddingBottom:'1%'}}>
                <h3>Negative</h3><SentimentDissatisfiedRoundedIcon />
            </Grid>
            <Grid item xs={1}>
            </Grid>
        </Grid>
    </div>)
}