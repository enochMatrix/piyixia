var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    "username": String,
    "password": String,
    "avatar": String,
    "diamond": Number,
    "quizscore": Number,
    "transaction":[{
        "diamond": Number,
        "date": Date,
        "usage": String
    }]
});


var User = mongoose.model("User",userSchema);

module.exports = User;

