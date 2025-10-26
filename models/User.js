const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
  firstName:{
    type:String,
    required:true
  },
  lastName:String,
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
   type:String,
   required:true,
  },
  userType:{
   type:String,
   required:true,
   enum:["host","guest"],
   default:'guest'
  },
  favId:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Home',  //Reference of the parent model 
  }]
})

module.exports=mongoose.model("User",userSchema);