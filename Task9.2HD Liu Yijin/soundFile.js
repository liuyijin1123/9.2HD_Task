const mongoose = require("mongoose");
const SoundFile = new mongoose.Schema({

    fileBase64: String,
    convertText: String,
    translation: String,
    emotion: {
        positive: String,
        negative: String
    }

});

module.exports  =  mongoose.model("SoundFiles", SoundFile);