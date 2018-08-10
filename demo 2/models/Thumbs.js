var mongoose = require("mongoose");

var thumbSchema = new mongoose.Schema({
      "uid": String,
      "challenge":[{
        "cid": String
      }]
});

var Thumbs = mongoose.model("Thumbs",thumbSchema);

module.exports = Thumbs;
