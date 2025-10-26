const Home=require('../models/homes')
const User=require('../models/User')

exports.getIndex=(req,res,next)=>{
  Home.find().then((body)=>{
    //console.log(body);
  res.render('store/index',{body:body,Page_title:'Index',currentPage :'index',isLoggedin:req.isLoggedin,user:req.session.user});
  });
}

exports.Addedhomes=(req,res,next)=>{
  Home.find().then((body)=>{
    //console.log(body);
  res.render('store/home-list',{body:body,Page_title:'Home List',currentPage :'Home',isLoggedin:req.isLoggedin,user:req.session.user});
  });
}

exports.getFavourites=(req,res,next)=>{
  const userId= req.session.user._id; //Since the current user will be stored in session only
  
  User.findById(userId).populate('favId').then((user)=>{
     res.render('store/favourites',{body:user.favId,Page_title:'Favourites',currentPage :'favourites',isLoggedin:req.isLoggedin,user:req.session.user});
  })

  }

exports.PostAddtoFavourites=(req,res,next)=>{ //Now POST request when some home is added to the favourite
  const HomeId=req.body.id;  //Since input type has homeid with it
  
  const userId= req.session.user._id; //current user

  User.findById(userId).then((user)=>{
    if(!user.favId.includes(HomeId)){
      user.favId.push(HomeId);
      return user.save();
    }
    return user;
  }).then(()=>{
    res.redirect("/favourites");
  })
  .catch((err)=>{
    console.log('Error while adding the home to favourites',err);
    res.redirect("/favourites");
  })
  
}

exports.getBookings=(req,res,next)=>{
  res.render('store/bookings',{Page_title:'Bookings',currentPage :'bookings',isLoggedin:req.isLoggedin,user:req.session.user});
}
exports.getHomeDetails=(req,res,next)=>{
  const Home_Id=req.params.homeid; //Same variable as used in routes, facility by express;
  console.log("The HomeId of selected home is :",Home_Id);
  Home.findById(Home_Id).then((home)=>{
    if(!home){
      res.redirect('/homes');
    }else{
     res.render('store/home-detail',{house:home,Page_title:home.house_name,currentPage :'Home',isLoggedin:req.isLoggedin,user:req.session.user});
    }
  })
}

exports.deleteFavouriteHome=(req,res,next)=>{
  const homeId=req.params.homeId; //Since form submitted to /host/delete/<%=house._id%>
  
  const userId=req.session.user._id;

  User.findById(userId).then((user)=>{
    if(user.favId.includes(homeId)){
      user.favId=user.favId.filter(fav=>fav!=homeId);
      return user.save();
    }
  }).then(()=>{
    res.redirect("/favourites");
  })
  .catch((err)=>{
    console.log('Error while deleting the home from favourites',err);
    res.redirect("/favourites");
  })
  
}