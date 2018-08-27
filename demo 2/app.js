var express = require("express");
var router = require("./router.js");
var db1 = require("./db1.js");
var session = require("express-session");


var app = express();


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

//静态头像文件夹
app.use("/avatar",express.static("./avatar"));
//静态视频文件夹
app.use("/videos",express.static("./videos"));
//静态视频封面文件夹
app.use("/covers",express.static("./covers"));

//静态挑战图文件夹
app.use("/challengeImage",express.static("./challengeImage"));



//注册
app.post("/register",router.register);
//登录
app.post("/login",router.login);
//退出登录
app.get("/logout",router.logout);


//上传头像
app.post("/add/avatar",router.addAvatar);

//获取头像
app.get("/avatar",router.getAvatar);


//得到所有视频url 信息 tag
app.get("/get/videos",router.getAllVideo);

//通过vid获取视频
app.get("/get/video/:vid",router.getVideo);

//上传视频
app.post("/add/video",router.addVideo);

//添加评论
app.post("/add/comment/:vid",router.addComment);

//得到某个视频的所有评论
app.get("/get/comment/:vid",router.getComment);

//新建图片挑战
app.post("/add/challengeImage",router.addChallengeImage);

//新建文字挑战
app.post("/add/challenge",router.addChallenge);

//添加挑战评论
app.post("/add/challengeComment/:cid",router.addChallengeComment);

//获取挑战评论
app.get("/get/challengeComment/:cid",router.getChallengeComment);

//用户充值
app.post("/add/diamond",router.addDiamond);

//获取挑战
app.get("/get/challenge",router.getChallenge);

//接受或拒绝某个挑战
app.get("/update/decision/challenge/:cid/:status",router.updateChallenge);

//赞助某个challenge
app.post("/update/sponsor/challenge/:cid",router.sponsorChallenge );

//得到quiz以及答案
app.get("/get/quiz",router.getQuiz);

//得到玩家quiz分数的排名
app.get("/get/rank",router.getRank);


//得到用户的全部交易记录
app.get("/get/transaction",router.getUserTransaction);

//收藏挑战
app.post("/add/video/thumbs",router.addThumbs);

//取消收藏挑战
app.post("/remove/thumbs",router.removeThumbs);

//获取收藏状态
app.get("/thumbs/:cid",router.getThumbs);

app.get("/add/quiz",router.addQuiz);



app.listen(3000);
