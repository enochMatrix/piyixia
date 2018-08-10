var mongoose = require("mongoose");

var quizSchema = new mongoose.Schema({
    "description": String,
    "correct": String,
    "options":[{
        "option1": String,
        "option2": String,
        "option3": String,
        "option4": String
    }]
});


var Quiz = mongoose.model("Quiz",quizSchema);


module.exports = Quiz;

