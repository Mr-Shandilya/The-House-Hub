
const express=require('express')

const authrouter=express.Router();

const authController=require('../controller/authController')

authrouter.get('/login',authController.getLogin);
authrouter.post('/login',authController.postLogin);
authrouter.post('/logout',authController.postLogout);

authrouter.get('/signup',authController.getSignUp);
authrouter.post('/signup',authController.postSignUp);

exports.authrouter=authrouter;
