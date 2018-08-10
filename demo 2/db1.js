const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/haha');

var db = mongoose.connection;
db.once('open',function (callback) {
    console.log("数据库连接成功");
});

module.exports = db;
