var formidable = require('formidable');
var path = require("path");
var md5 = require("./md5.js");
var Video = require("./models/Video");
var Challenge = require("./models/Challenge");
var User = require("./models/User");
var Quiz = require("./models/Quiz");
var Thumbs = require("./models/Thumbs");
var ObjectId = require('mongodb').ObjectID;
var ip = "http://192.168.10.107:3000/";
var ffmpeg = require('fluent-ffmpeg');
var db = require('./db');



//注册
exports.register = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req,function (err,fields,files) {
        if (err){
            res.send("没有收到表单");
            return;
        }
        var username = fields.username;
        var password = fields.password;
        User.find({"username":username},function (err,result) {
            if (err){
                res.send("服务器错误");
                return;
            }
            if (result.length != 0){
                res.send("用户名重复");
                return;
            }
            User.create({
                "username": username,
                "password": md5(md5(password)+"pi"),
                "avatar": "default.jpeg",
                "diamond#": 0
            },function (err,user) {
                if (err){
                    res.send("服务器错误");
                    return;
                } else{
                    //注册成功的时候设置session
                    req.session.login = "1";
                    req.session.uid = user._id;
                    req.session.username = username;
                    console.log(user);
                    res.send("注册成功");
                }
            });
        });
    });
}

//登录
exports.login = function (req,res,next) {
    var form = new formidable.IncomingForm();
    form.parse(req,function (err,fields,files) {
        if (err){
            res.json({content:"没有收到表单",status:-1});
            return;
        }
        var username = fields.username;
        var password = fields.password;
        User.find({
            "username": username,
            "password": md5(md5(password)+"pi")
        },function (err,result) {
            if (err){
                res.json({content:"服务器错误",status:-1});
            }
            if (result.length == 0){
                res.json({content:"用户名或密码错误",status:-1});
            }else{
                req.session.login = "1";
                req.session.uid = result[0]._id;
                req.session.username = username;
                res.json({content:"登陆成功",status:1});
                console.log(req.session.username);
            }
        });
    });
}

//登出
exports.logout = function (req,res,next) {
    req.session.destroy(function (err) {
        if (err){
            res.send("服务器错误");
            return;
        }
        res.send("登出成功");
    })
}

//上传头像
exports.addAvatar = function(req, res, next) {
    if (req.session.login != "1"){
        res.send("未登录");
        return;
    }
    var uid = req.session.uid;
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    var uploadPath = path.normalize(__dirname + "/avatar");
    form.uploadDir = uploadPath;
    form.parse(req,function (err,fields,files) {
      console.log(files.files.path);
        var avatarName = files.files.path.split('/');
        var realPath = ip+avatarName[avatarName.length-2]+'/'+avatarName[avatarName.length-1];
        var query = {"_id":ObjectId(uid)};
        var update = {
            $set:{"avatar":realPath},
        };
        User.findOneAndUpdate(query,update,{new:true},function (err, result) {
            if (err){
                res.send("上传失败");
                return;
            }
            res.send("上传成功");
        });
    });
}



//上传video
exports.addVideo = function (req, res, next) {
    if (req.session.login != "1"){
        res.send("未登录");
        return;
    }
    var username = req.session.username;
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    var uploadPath = path.normalize(__dirname + "/videos");
    form.uploadDir = uploadPath;
    form.parse(req,function (err,fields,files) {
        var videoName = files.video.path.split('/');
        var realPath = ip+videoName[videoName.length-2]+'/'+videoName[videoName.length-1];
        var coverPath = path.normalize(__dirname + "/covers");
        var realCoverPath = ip+'covers/'+videoName[videoName.length-1]+'.png';
        console.log(realCoverPath);
        ffmpeg(files.video.path).screenshots({
            timestamps: ['50%'],
            filename: videoName[videoName.length-1]+'.png',
            folder: coverPath,
            size: '320x240'
        });
        Video.create({
            "title":fields.title,
            "description":fields.description,
            "url":realPath,
            "coverUrl":realCoverPath,
            "author":username
        },function (err) {
            if (err){
                res.send("上传失败");
                return;
            }
            res.send("视频上传成功");
        });
    });
}

//获取用户头像
exports.getAvatar = function (req,res,next) {
  var uid = req.session.uid;
  User.find({"_id": ObjectId(uid)},function (err, result) {
    if (err){
      res.send('ERROR!');
      return;
    }
    res.send(result);
  });
}

//通过vid获取video
exports.getVideo = function (req,res,next) {
    var vid = req.params.vid;
    console.log(vid);
    Video.find({"_id": ObjectId(vid)},function (err, result) {
        if (err){
            res.send("服务器错误");
            return;
        }
        res.send(result);
    });

}

//获取所有video
exports.getAllVideo =  function (req,res,next) {
    console.log(req.params.vid);
    Video.find({},function (err,result) {
        if(err){
            res.send("服务器错误");
            return;
        }
        res.send(result);
    });
}





//添加评论
exports.addComment = function (req,res,next) {
      console.log(req.params.vid);
    if (req.session.login != "1"){
        res.send("未登录");
        return;
    }
    var vid = req.params.vid;
    var form = new formidable.IncomingForm();
    form.parse(req,function (err,fields,files) {
        if (err){
            res.send("没有收到表单");
            return;
        }
        var newComment = {
            "author": req.session.username,
            "date": new Date().toISOString().slice(0, 10),
            "content": fields.comment
        };
        var query = {"_id":ObjectId(vid)};
        var update = {$push: {"comment":newComment}};
        Video.findOneAndUpdate(query,update,{new:true},function (err,result) {
            if (err){
                res.send("服务器错误");
                return;
            }
            res.send("评论发表成功");
        });
    });
}

//获取评论
exports.getComment = function (req,res,next) {
    var vid = req.params.vid;
    Video.find({"_id":ObjectId(vid)},function (err,result) {
        if (err){
            res.send("服务器错误");
        }
        if (result.length == 0) {
            res.send("未找到视频");
        }
        res.send(result[0].comment);

    });
}

//新建图片challenge
exports.addChallengeImage = function(req,res,next){
    if (req.session.login != "1"){
        res.send("未登录");
        return;
    }
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    var uploadPath = path.normalize(__dirname + "/challengeImage");
    form.uploadDir = uploadPath;
    form.parse(req,function (err,fields,files) {
      var imageName = files.image.path.split('/');
      var realPath = ip+imageName[imageName.length-2]+'/'+imageName[imageName.length-1];
        if (err){
            res.send("没有收到表单");
            return;
        }

        Challenge.create({
            "title": fields.title,
            "description": fields.description,
            "endTime": new Date(fields.y,fields.m,fields.d,fields.h),
            "currentTime": new Date(),
            "url": realPath,
            "author": req.session.username,
            "diamond#": 0,
            "status": 0  //1表示已接收 -1表示已拒绝 0表示pending
        },function (err) {
            if (err){
                res.send("服务器错误");
            }else {
                res.send("添加挑战成功");
            }
        })
    });
}

//新建纯文字challenge
exports.addChallenge = function(req,res,next){
    if (req.session.login != "1"){
        res.send("未登录");
        return;
    }
    var form = new formidable.IncomingForm();
    form.parse(req,function (err,fields,files) {
        if (err){
            res.send("没有收到表单");
            return;
        }

        Challenge.create({
            "title": fields.title,
            "description": fields.description,
            "endTime": new Date(fields.y,fields.m,fields.d,fields.h),
            "currentTime": new Date(),
            "author": req.session.username,
            "diamond#": 0,
            "status": 0  //1表示已接收 -1表示已拒绝 0表示pending
        },function (err) {
            if (err){
                res.send("服务器错误");
            }else {
                res.send("添加挑战成功");
            }
        })
    });
}

// //获取challenge
// exports.getChallenge = function (req,res,next) {
//     Challenge.find({},function (err,result) {
//         if (err){
//             res.send("服务器错误");
//             return;
//         }
//         res.send(result)
//     });
// }


//获取challenge
exports.getChallenge = function (req,res,next) {
    Challenge.find({},function (err,result) {
        if (err){
            res.send("服务器错误");
            return;
        }
        res.send(result)
    });
}

//接受或拒绝challenge
exports.updateChallenge = function (req,res,next) {
    if (req.session.login != "1"){
        res.send("未登录");
        return;
    }
    var cid = req.params.cid;
    var status = req.params.status;
    var query = {"_id":ObjectId(cid)};
    Challenge.findOneAndUpdate(query,{$set:{"status":status}},{new: true},function (err,result) {
        if (err){
            res.send("操作失败");
            return;
        }
        res.send("操作成功");
    });
}

//赞助一个challenge
exports.sponsorChallenge = function (req,res,next) {
    var cid = req.params.cid;
    var uid = req.session.uid;
    var cname = '';
    //var diamond = parseInt(req.params.diamond);
    var username = req.session.username;
    //console.log(diamond);
    if (req.session.login != "1"){
        res.send("未登录");
        return;
    }
    Challenge.findById(ObjectId(cid),function(err,result){
      if(err){
        res.send("ERROR");
        return;
      } else {
        cname = result.title;
      }
    });
    var form = new formidable.IncomingForm();
    form.parse(req,function (err,fields,files) {
    User.findById(ObjectId(uid), function (err,result) {
        if (err){
            res.send("服务器错误");
            return;
        }
        //console.log(result);
        var currentDiamond = result.diamond;
        if (currentDiamond < fields.diamond){
            res.json({status:'-1', balance:currentDiamond});
            return;
        }
        var transaction = {
            "diamond": -fields.diamond,
            "date": new Date(),
            "usage": '赞助挑战：'+cname+'\n钻石数： '+fields.diamond
        };
        var query = {"_id":ObjectId(uid)};
        var update = {
            $set: {"diamond":currentDiamond-fields.diamond},
            $push: {"transaction":transaction}
        };
        console.log(transaction);
        console.log(query);
        console.log(update);

        User.findOneAndUpdate(query,update,{new:true},function (err,result1) {
            if (err){
                res.send("服务器错误");
                return;
            }
            //console.log(result1);
            Challenge.findById(ObjectId(cid),function (err,challenge) {
                if (err){
                    res.send("服务器错误");
                    return;
                }
                if (challenge == null) {
                    res.send("cid错误");
                    return;
                }
                challenge.diamond = fields.diamond;
                challenge.save();
                res.json({status:'success',balance:fields.diamond});
            });
          });
        });
    })
}

//添加挑战评论
exports.addChallengeComment = function (req,res,next) {
  var cid = req.params.cid;
  var uid = req.session.uid;
      console.log(req.params.cid);
    if (req.session.login != "1"){
        res.send("未登录");
        return;
    }
    var form = new formidable.IncomingForm();
    form.parse(req,function (err,fields,files) {
      User.findById(ObjectId(uid), function (err,result) {
        if (err){
            res.send("没有收到表单");
            return;
        }

        var newComment = {
            "author": req.session.username,
            "date": new Date(),
            "content": fields.content
        };
        var query = {"_id":ObjectId(cid)};
        var update = {$push: {"comment":newComment}};
        Challenge.findOneAndUpdate(query,update,{new:true},function (err,result) {
            if (err){
                res.send("服务器错误");
                return;
            }
            //console.log(result);
            res.send("评论发表成功");
        });
      });
    });
}

//获取挑战评论
exports.getChallengeComment = function (req,res,next) {
    var cid = req.params.cid;
    Challenge.find({"_id":ObjectId(cid)},function (err,result) {
        if (err){
            res.send("服务器错误");
        }
        if (result.length == 0) {
            res.send("未找到挑战");
        }
        res.send(result);

    });
}



//用户充值
exports.addDiamond = function(req, res, next) {
  console.log('用户充值页面');
    var uid = req.session.uid;
    if (req.session.login != "1"){
        res.send("未登录");
        return;
    }
    var form = new formidable.IncomingForm();
    form.parse(req,function (err,fields,files) {
      User.findById(ObjectId(uid), function (err,result) {
        if (err){
            res.send("没有收到表单");
            return;
        }
        var query = {"_id":ObjectId(uid)};
        var transaction = {
            "diamond": +fields.diamond,
            "date": new Date(),
            "usage": '充值 '+fields.diamond+' 个钻石',
        };
        var currentDiamond = result.diamond;
        var update = {
          $set: {"diamond":currentDiamond+fields.diamond},
          $push: {"transaction":transaction}
        };
        User.findOneAndUpdate(query,update,{new:true},function (err, result1) {
            if (err){
                res.send('上传失败');
                return;
            }
            res.send('success');
        });
      });
    });
}



exports.addQuiz = function(req,res,next){
    Quiz.create({
        "correct" : "option1",
        "options" : {
            "option1" : "别整这些",
            "option2" : "有的没的",
            "option3" : "五五六六",
            "option4" : "七七八八"
        },
        "description" : "Jowei ajfoeiv wel weivi, le sl owjefv wieojo preo aljei.Jowei ajfoeiv wel weivi, le sl owjefv wieojo preo aljei.Jowei ajfoeiv wel weivi, le sl owjefv wieojo preo aljei.Jowei ajfoeiv wel weivi, le sl owjefv wieojo preo aljei.这题选A"
    },function (err) {
        if (err){
            res.send("服务器错误");
            return;
        }
        res.send("charuchenggong");
    });
}


//获得全部quiz
exports.getQuiz = function (req,res,next){
    Quiz.find({},function (err,result) {
        if (err) {
            res.send("服务器错误");
        }
        res.send(result);
    });
}

//获取用户的排名
exports.getRank = function (req,res,next){
    User.find({}).sort({"quizscore":1}).limit(50).exec(function(err,result){
        if (err){
            res.send("服务器错误");
            return;
        }
        res.send(result);
    });
}

//获取记录
exports.getUserTransaction = function (req,res,next){
        var uid = req.session.uid;
        console.log(uid);
        db.find("users",{_id:ObjectId(uid)},function (err,result) {
        if (err){
            res.send("服务器错误");
            return;
        }
        if (result == null) {
            res.send("找不到此用户");
            return;
        }
        console.log(result);
        res.json(result);
    });
}



//收藏（点赞）挑战
exports.addThumbs = function (req,res,next) {
    var uid = req.session.uid;
    if (req.session.login != "1"){
        res.send("未登录");
        return;
    }
    var form = new formidable.IncomingForm();
    form.parse(req,function (err,fields,files) {
      if(err){
        console.log(err);
      }
      var cid = fields.cid;
      var query = {"uid":ObjectId(uid)};
      var newChalleng = {
        "cid": cid
      }
      var update = {$push: {"challenge":newChalleng}};
      db.update("Thumbs",{"uid":uid},{$push: {"challenge.cid":cid}},{ upsert: true, multi: false },function(err,result){
        if(err){
          console.log(err);
        }
        res.send("1");
      });
    });
  }

//取消收藏
exports.removeThumbs = function (req,res,next) {
  var uid = req.session.uid;
  if (req.session.login != "1"){
      res.send("未登录");
      return;
  }
  var form = new formidable.IncomingForm();
  form.parse(req,function (err,fields,files) {
    if(err){
      console.log(err);
    }
    var cid = fields.cid;
    db.update("Thumbs",{"uid":uid},{"$pull":{"challenge.cid":cid}},function(err,result){
      if(err){
        console.log(err);
      }
      res.send("1");
    });
  });
}


//获取收藏状态
exports.getThumbs = function (req,res,next) {
  var cid = req.params.cid;
  var uid = req.session.uid;
  if (req.session.login != "1"){
      res.send("未登录");
      return;
  }
  db.find("Thumbs",{"uid":uid,'challenge.cid':cid},function (err,result) {
    if(err){
      console.log(err);
    }
    res.send(result);
  });
}
