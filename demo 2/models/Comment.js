var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    "content": String,
    "author": String
});

var Comment = mongoose.model("Video",commentSchema);

module.exports = Comment;

