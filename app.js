//core Modles
const path=require('path')
//External Modules
const express=require('express')
const app=express()

//local modules
const {host}=require('./routes/host');
const user=require('./routes/user');
const rootDir=require('./util/path');

app.use(express.static(path.join(rootDir,"public")));//Included the css file and made it public

app.set('view engine','ejs');
app.set('views','views');

app.use(express.urlencoded());
app.use("/host",host);
app.use(user);
app.use((req,res,next)=>{
 res.status(404).render('404',{Page_title:'Page Not Found'});
})
const PORT=3000;
app.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
})