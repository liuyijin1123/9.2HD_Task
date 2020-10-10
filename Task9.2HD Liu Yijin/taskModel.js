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
    picBase64: String

});

module.exports  =  mongoose.model("Task_v2.0", userSchema);

