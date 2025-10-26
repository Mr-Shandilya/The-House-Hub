const Home=require('../models/homes')

exports.AddHomes=(req,res,next)=>{
  res.render('host/edit-homes',{Page_title:'Add Home',currentPage :'addHome',Editing:false,isLoggedin:req.isLoggedin,user:req.session.user});
}
exports.getHostHomes=(req,res,next)=>{
  Home.find().then((body)=>{
  res.render('host/host-home-list',{body:body,Page_title:'Host Home',currentPage :'host-homes',isLoggedin:req.isLoggedin,user:req.session.user});
  });
}
exports.submitHomes=(req,res,next)=>{
  const{house_name,Location,Price,Rating,Image_url,description}=req.body;
  const home= new Home({house_name,Location,Price,Rating,Image_url,description});
  home.save();
  res.render('host/home-added',{Page_title:'Home-Added',currentPage :'homeAdded',isLoggedin:req.isLoggedin,user:req.session.user});
}
exports.EditHomes=(req,res,next)=>{
  const homeId=req.params.homeId;
  const editing=req.query.editing==='true';
  Home.findById(homeId).then((home)=>{
    
    if(!home){
      res.redirect('/host/host-home-list');
    }else{
      res.render('host/edit-homes',{Page_title:'Edit Home',house:home,currentPage :'host-homes',HomeId: homeId,Editing:editing,isLoggedin:req.isLoggedin,user:req.session.user});
    }
  })
}
exports.PostEditHomes=(req,res,next)=>{
  const{house_name,Location,Price,Rating,Image_url,description,id}=req.body;
  Home.findById(id).then((home)=>{
    if(!home){
      console.log("Home not found for editing");
      return res.redirect('/host/host-home-list');
    }

    home.house_name=house_name;
    home.Location=Location;
    home.Price=Price;
    home.Rating=Rating;
    home.Image_url=Image_url,
    home.description=description
    home.save();
    return res.redirect('/host/host-home-list');
  })
}
exports.deleteHome=(req,res,next)=>{
  const homeId=req.params.homeId;
  Home.findByIdAndDelete(homeId).then(()=>{
    res.redirect('/host/host-home-list');
  }).catch((err)=>{
    console.log("Error while deleting home",err);
  })
}