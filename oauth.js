/**
 * Created by Administrator on 2016/7/6.
 */
var OAuth=require("wechat-oauth");
var https=require("https");
var express=require('express');
var urlPares=require('url');
var app=express();
var appID="wx9a66afce31e4ec8b";
var appSecret="c2b679dbd1ea6c0ffc99155123a25697";
var scope='snsapi_userinfo';
var redirectUrl="dev-facebook.beautifulreading.com/code";
var Client=new OAuth(appID,appSecret);
var url=Client.getAuthorizeURL(redirectUrl,'',scope);
app.get('/',function (req,res) {
    res.writeHead(302,{
        'Location':url
    })
})
app.get('/code',function (req,res) {
    var rlt=urlPares.parse(req,true).query;
    var code=rlt.code;
    Client.getAccessToken(code,function (err,result) {
        var accessToken=result.data.access_token;
        var openID=result.data.openid;
        Client.getUser(openID,function (err,result) {
            var userInfo=result;
        })
    })
})
var server=app.listen(10000,function () {
    console.log("sucess!");
})

