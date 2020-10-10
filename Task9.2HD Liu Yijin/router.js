const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const User = require("./taskModel");
const Sound = require("./soundFile");
const mongoose = require("mongoose");
const cors = require('cors');
let crypto = require('crypto');
let fetch = require('node-fetch');
let md5 =require("md5");
let UUID = require('uuid');
let urlencode = require('urlencode');
let showapiSdk = require('showapi-sdk');


const app = express();
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: false
}));
app.use(bodyParser.json({limit: "50mb"}));
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

app.get('/adding_soundFile', (req,res)=>{

    Sound.find({
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

app.post('/adding_soundFile', (req,res)=>{

    let soundBase64 = req.body.soundBase64;
    let convertText = '';
    let analyze = '';
    let positive = 0;
    let negative = 0;

    let appId='389025';
    let secret='0e4d16e2ab7149a28ec708c5cb09c9c7';

    showapiSdk.setting({
        url:"http://route.showapi.com/1682-1",//你要调用的API对应接入点的地址,注意需要先订购了相关套餐才能调
        appId:appId,//你的应用id
        secret:secret,//你的密钥
        timeout:5000,//http超时设置
        options:{//默认请求参数,极少用到
            testParam:'test'
        }
    });

    let request=showapiSdk.request();
    request.appendText('speechData',soundBase64);
    request.appendText('type','wav');
    request.appendText('language','3');
    request.post(function(data){
        console.info(data);
        if (data.showapi_res_body.showapi_fee_code === -1) {
            res.json({"info": "Fail to convert sound to text!"});
        } else {
            convertText = JSON.parse(JSON.stringify(data.showapi_res_body.infos).substring(1,JSON.stringify(data.showapi_res_body.infos).length-1)).info_1;
            console.log(JSON.parse(JSON.stringify(data.showapi_res_body.infos).substring(1,JSON.stringify(data.showapi_res_body.infos).length-1)).info_1);

            //=========================
            console.log('Translating');
            var showapiSdk3 = require('showapi-sdk');

            showapiSdk3.setting({
                url:"http://route.showapi.com/32-9",
                appId:appId,//你的应用id
                secret:secret,//你的密钥
                timeout:5000,//http超时设置
                options:{//默认请求参数,极少用到
                    testParam:'test'
                }
            })

            var request=showapiSdk3.request();
            request.appendText('q',convertText);
            request.appendText('fromLanguage','3');
            request.appendText('toLanguage','1');
            request.post(function(data){
                analyze = JSON.stringify(data.showapi_res_body.translation).substring(1,JSON.stringify(data.showapi_res_body.translation).length-1);
                console.log(analyze);

                //================================
                console.log('Analyzing');
                var showapiSdk2 = require('showapi-sdk');

                showapiSdk2.setting({
                    url:"http://route.showapi.com/1750-3",//你要调用的API对应接入点的地址,注意需要先订购了相关套餐才能调
                    appId:appId,//你的应用id
                    secret:secret,//你的密钥
                    timeout:5000,//http超时设置
                    options:{//默认请求参数,极少用到
                        testParam:'test'
                    }
                })

                var request=showapiSdk2.request();
                request.appendText('text',analyze);
                request.post(function(data){
                    console.log(data);
                    console.log(JSON.stringify(data.showapi_res_body.data.items))
                    positive = JSON.parse(JSON.stringify(data.showapi_res_body.data.items).substring(1,JSON.stringify(data.showapi_res_body.data.items).length-1)).positive_prob;
                    negative = JSON.parse(JSON.stringify(data.showapi_res_body.data.items).substring(1,JSON.stringify(data.showapi_res_body.data.items).length-1)).negative_prob;
                    console.info(positive);
                    console.log(negative);

                    let sound=new Sound({
                            fileBase64: soundBase64,
                            convertText: convertText,
                            translation: analyze,
                            emotion: {
                                positive: positive,
                                negative: negative
                            }
                        }
                    );
                    sound
                        .save()
                        .catch((err) => console.log(err));

                    if (res.statusCode === 200) {
                        res.json({"info": "The Sound file has been added and processed!","convertText":convertText,"translation":analyze,"positive":Math.round(positive*10),"negative":Math.round(negative*10)});
                    }
                    else {
                        showMessage("Fail to add the File!", res);
                    }

                })
                //================================
            })
            //=========================
        }

    });

});


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
    let picBase64 = req.body.picBase64;

    if (type !== 'Image-Processing') {
        picBase64 = '';
    }

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
            picBase64: picBase64

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