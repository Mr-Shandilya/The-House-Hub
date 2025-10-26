//External Modules
const express=require('express')

//local
const user=express.Router();
const homeController=require('../controller/storeController')
//const {body}=require('./host')//body aa gayi 
user.get('/',homeController.getIndex);
user.get('/homes',homeController.Addedhomes);
user.get('/homes/:homeid',homeController.getHomeDetails);
user.get('/favourites',homeController.getFavourites);//GET to see favourittes
user.post('/favourites',homeController.PostAddtoFavourites);//POST to add in favourite
user.post('/favourite/delete/:homeId',homeController.deleteFavouriteHome);//POST to add in favourite
user.get('/bookings',homeController.getBookings);
module.exports=user;