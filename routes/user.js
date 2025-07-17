//External Modules
const express=require('express')
//core Modles
const path=require('path')
//local
const rootDir=require('../util/path');
const user=express.Router();
const {body}=require('./host')//body aa gayi 
user.get('/',(req,res,next)=>{
  console.log(body);
  res.render('user',{body:body,Page_title:'Home Page'});
});

module.exports=user;