var mongoose = require("mongoose");

var challengeSchema = new mongoose.Schema({
    "title": String,
    "description": String,
    "endTime": Date,
    "currentTime": Date,
    "url": String,
    "comment":[{
    "author": String,
    "date": Date,
    "content": String
    }],
    "author": String,
    "diamond": Number,
    "status": Number  //1表示已接收 -1表示已拒绝 0表示pending
});


var Challenge = mongoose.model("Challenge",challengeSchema);

module.exports = Challenge;
