//External Modules
const express=require('express')
//local
const hostrouter=express.Router();
const homeController=require('../controller/hostController')
hostrouter.get('/add-home',homeController.AddHomes);
hostrouter.get('/host-home-list',homeController.getHostHomes);
hostrouter.get('/edit-home/:homeId',homeController.EditHomes);
hostrouter.post('/edit-home',homeController.PostEditHomes);
hostrouter.post('/submit-home',homeController.submitHomes);
hostrouter.post('/delete/:homeId',homeController.deleteHome);

exports.host=hostrouter;
//exports.body=body;