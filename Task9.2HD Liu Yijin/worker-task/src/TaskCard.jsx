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

    // fetch('http://node.wanxutao.space/api/download?HASH=ffdb684cd4459dd371e2f33100787f2d&fileName=0CA6C2AE4A81D1DA7D474FF948F4A5AD144AC8576F6447F7F3F4693839A78F7A_sk_13_cid_1.jpeg',{
    //     method: 'get',
    // })
    //     .then(response => response.text())
    //     .then((body) => {
    //     });

    const classes = useStyles();

    const [expand, changeExpand] = useState(true);
    const handleClick = (event) => {

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