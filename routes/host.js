//External Modules
const express=require('express')
//core Modles
const path=require('path')
//local
const rootDir=require('../util/path');
const hostrouter=express.Router();
hostrouter.get('/add-home',(req,res,next)=>{
  res.render('addhome',{Page_title:'Add Home'});
});
const body=[];
hostrouter.post('/submit-home',(req,res,next)=>{
  body.push(req.body); //Now pushing the whole object
  //console.log(body);
  res.redirect("/");
})
exports.host=hostrouter;
exports.body=body;