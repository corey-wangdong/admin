const express = require('express');
const crypto = require('crypto');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const jwt = require('jsonwebtoken');

var uE = bodyParser.urlencoded({extended:false});

const app = express();

app.use(session({
    secret:'123456',  
    cookie:{maxAge:80*1000},  
    resave:true,  
    saveUninitialized:false   
}));

app.use(function(req,res,next) {
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');  
    next()
})

var dbCollection = mongoose.model("users",{
    username:String,
    userpwd:String,
    useremail:String
})

//登录
app.post('/login',uE,(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body)
   console.log(username)
   console.log(password)
    var md5Pwd = crypto.createHash('md5').update(upwd).digest('hex');

    mongoose.connect('mongodb://localhost:27017/douban',{useNewUrlParser:true},function(err) {
        if(err) {
            console.log("亲，数据库连接失败");
        }else {
            dbCollection.find({userpwd:md5Pwd,useremail:uemail}).then((ok)=>{
                if(ok.length>0) {
                    // req.session.loginok=true;
                    // res.session.unames=uemail;

                    //token验证
                    var data= {
                        loginok:true,
                        username:uemail
                    }
                    var mi='asdfgkdmdlldlld';
                    var token = jwt.sign(data,mi);
                    res.send({mes:'登录成功',status:200,linkId:3,token})
                }else {            
                    res.send({meg:"登录失败",status:'500',linkId:4})
                }    
            })
        }
    })
})

//注册
app.post('/reg',uE,(req,res)=>{
    var uemail = req.body.email;
    var upwd = req.body.password;
    var uname = req.body.username;
   
    var md5Pwd = crypto.createHash('md5').update(upwd).digest('hex');

    mongoose.connect('mongodb://localhost:27017/douban',{useNewUrlParser:true},function(err) {
        if(err) {
            console.log("亲，数据库连接失败");
        }else {
            dbCollection.find({username:uname}).then((ok)=>{
                if(ok.length>0) {
                    res.send({mes:'用户名已存在,请重新注册',status:200,linkId:2})
                }else {
                    var user = new dbCollection({
                        username:uname,
                        useremail:uemail,
                        userpwd:md5Pwd
                    })

                    user.save().then((ok)=>{
                        res.send({mes:"注册成功",status:'200',linkId:1})
                    },(err)=>{
                        res.send({meg:"注册失败",status:'500',linkId:0})
                    })
                }
            })
        }
    })
})

app.post("/panduan",uE,function(req,res){
    console.log(req.body.dataToken)
    var token  = req.body.dataToken;
    var mi='asdfgkdmdlldlld';
    jwt.verify(token,mi,(err,ok)=>{
        if(ok.loginok == true) {
            res.send({mes:"用户登陆过",status:200,linkid:5,username:ok.username})
        }else {
            res.send({mes:"用户没有登陆过",status:200,linkid:6})
        }
    })
    // if(req.body.session.loginok==true){
    //     res.send({mes:"用户登陆过",status:200,linkid:5,username:req.body.session.uname})
    // }else{
    //     res.send({mes:"用户没有登陆过",status:200,linkid:6})
    // }
})


app.listen(8888,function(){
    console.log('亲，服务器启动正常，正在监听8888端口');
})