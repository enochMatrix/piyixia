var mongoose = require("mongoose");

var videoSchema = new mongoose.Schema({
    "title": String,
    "url": String,
    "coverUrl":String,
    "description": String,
    "tag": String,
    "comment":[{
        "author": String,
        "date": Date,
        "content": String
    }],
    "author": String
});



var Video = mongoose.model("Video",videoSchema);

module.exports = Video;
