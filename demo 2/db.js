var MongoClient = require("mongodb").MongoClient;


function _connectDB(callback) {
    var url = 'mongodb://localhost:27017/haha';
    MongoClient.connect(url, function (err,database) {
        if(err){
            throw err;
            return;
        }

        console.log("connect success");
        callback(err,database)
    });
}

exports.insertOne = function (collectionName, json, callback) {
    _connectDB(function (err,client) {
        client.db("haha").collection(collectionName).insertOne(json,function (err,result) {
            callback(err,result);
            client.close();
        })
    })
};

exports.find = function (collectionName,json,callback) {
    var result = [];
    if (arguments.length != 3){
        callback("find函数接收三个参数",null);
        return;
    }
    _connectDB(function (err,client) {
        client.db("haha").collection(collectionName).find(json).toArray(function (err,result) {
            if (err){
                callback(err,null);
                return;
            }
            else{
                callback(null,result);
            }
            client.close();
        });

    });
};


