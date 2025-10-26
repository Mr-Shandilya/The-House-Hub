//core Modules
const path=require('path')
//External Modules
const express=require('express')
const app=express()
const session=require('express-session')



//local modules
const {host}=require('./routes/host');
const user=require('./routes/user');
const {authrouter}=require('./routes/authRouter');
const rootDir=require('./util/path');
const homeController=require('./controller/Errors');
//const {mongoConnect} = require('./util/databaseUtil');



const { default: mongoose } = require('mongoose');

app.use(express.static(path.join(rootDir,"public")));//Included the css file and made it public

app.set('view engine','ejs');
app.set('views','views');

app.use(express.urlencoded());


const PORT=3000;
const MongoURL="mongodb+srv://Mr-Shandilya:<password>@mr-shandilya.e7ajwbp.mongodb.net/house_hub?retryWrites=true&w=majority&appName=Mr-Shandilya";


const MongoDBStore=require('connect-mongodb-session')(session);
const store=new MongoDBStore({
  uri: MongoURL,
  collection:'session',
})


app.use(session({
  secret:'The House Hub', //a secret key used to sign and verify the session ID cookie (encryption)
  resave: false,  //Don’t resave unchanged sessions.
  saveUninitialized:true, //true means: Even if you haven’t added anything to req.session, it will still create and store a new session.
  store:store
}))

app.use((req,res,next)=>{
  //req.isLoggedin=req.get('Cookie')?req.get('Cookie').split('=')[1]==='true':false;
  req.isLoggedin=req.session.isLoggedin;
  next();
})

app.use("/host",(req,res,next)=>{
  if(!req.isLoggedin){
    return res.redirect("/login");
  }
  next();
});
app.use("/host",host);
app.use(user);
app.use(authrouter);
app.use(homeController.PageNotFound)

//MONGODB


mongoose.connect(MongoURL).then(()=>{
  //console.log("successfully connected to mongoose");
  app.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
  })
}).catch((err)=>{
  console.log("Error while connecting to mongoose",err);
})

