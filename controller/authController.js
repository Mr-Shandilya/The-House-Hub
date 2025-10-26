const { check, validationResult } = require("express-validator");
const bcrypt=require('bcryptjs');

const User=require('../models/User');


exports.getLogin=(req,res,next)=>{
  res.render('auth/login',{Page_title:'Login-Page',currentPage :'Login-Page',Editing:false,isLoggedin:false,
    user:req.session.user
  });
}


exports.postLogin= async (req,res,next)=>{
  const {email,password}=req.body;
  
  //Find this user in user module
  const user=await User.findOne({email:email}); //Pura user object aa gaya 

 //Agar user is not pre registered means not in our db
  if(!user){
    return res.render('auth/login',{Page_title:'Login-Page',currentPage :'Login-Page',Editing:false,isLoggedin:false,user:req.session.user,
      errorMessage:["User not Found"],
      Oldinputs:{email}
    })
  }
  
  //Now definately we'll have user object just check password 
  const ismatch=await bcrypt.compare(password,user.password); //Benefit of bcrypt: hashed the new entered pswd & compared

  //If password doesn't match
  if(!ismatch){
     return res.render('auth/login',{Page_title:'Login-Page',currentPage :'Login-Page',Editing:false,      isLoggedin:false,user:req.session.user,
      errorMessage:["Incorrect Password"],
      Oldinputs:{email}
    })
  }

  //Now definately we have the right user 

  req.session.isLoggedin=true;
  req.session.user=user; //Now stored the full user information for Authorisation
  await req.session.save(); //Saved the session
  res.redirect("/");
}




exports.postLogout=(req,res,next)=>{
  //res.cookie("isLoggedin",false);
  req.session.destroy(()=>{
     res.redirect("/");
  }) 
}


exports.getSignUp=(req,res,next)=>{
  res.render('auth/signup',{Page_title:'SignUp-Page',currentPage :'SignUp-Page',Editing:false,isLoggedin:false,user:req.session.user});
}


exports.postSignUp=[
  check('firstName')
     .trim()
     .isLength({min:2})
     .withMessage('First Name must be at least 2 characters long')
     .matches(/^[a-zA-Z\s]+$/)
     .withMessage('First Name can only contain letters'),

  check('lastName')
     .matches(/^[a-zA-Z\s]*$/)
     .withMessage('Last Name can only contain letters'),

  check('email')
     .isEmail()
     .withMessage('Please enter a valid email')
     .normalizeEmail(),

  check('password')
     .trim()
     .isLength({min:8})
     .withMessage('Password must be at least 8 characters long')
     .matches(/[a-z]/)
     .withMessage('Password must contain at least one lowercase letter')
     .matches(/[A-Z]/)
     .withMessage('Password must contain at least one uppercase letter')
     .matches(/[!@#$&]/)
     .withMessage('Password must contain at least one special character'),

  check('confirmPassword')
  .trim()
  .custom((val,{req})=>{
    if(val!== req.body.password){
      throw new Error('Passwors do not match');
    }
   return true;
  }),

  check('userType')
  .notEmpty()
  .withMessage('User type is required')
  .isIn(['guest','host'])
  .withMessage('Invalid user type'),

  check('terms')
  .notEmpty()
  .withMessage('You must accept the terms and conditions')
  .custom((val)=>{
    if(val !=='on'){
      throw new Error('You must accept the terms and conditions');
    }
    return true;
  }),

  //Now final middleware
  
  (req,res,next)=>{
    const{firstName,lastName,email,password,userType}=req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).render("auth/signup",{
       Page_title:'SignUp-Page',currentPage :'SignUp-Page',Editing:false,isLoggedin:false,user:req.session.user,
       errorMessage:errors.array().map(err=>err.msg),
       Oldinputs:{firstName,lastName,email,password,userType}
      })
    }

    //When input is validated and no error
    bcrypt.hash(password,12).then((hashedPassword)=>{
       const user=new User({firstName,lastName,email,password:hashedPassword,userType});
       user.save().then(()=>{
        res.redirect("/login");
      }).catch((err)=>{ //May be possible that duplicate email
        res.status(422).render("auth/signup",{
       Page_title:'SignUp-Page',currentPage :'SignUp-Page',Editing:false,isLoggedin:false,
       user:req.session.user,
       errorMessage:[err.message],
       Oldinputs:{firstName,lastName,email,password,userType}
      })
      })
    });
      
}]