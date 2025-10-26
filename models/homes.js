/*
   this.house_name=house_name;
    this.Location=Location;
    this.Price=Price;
    this.Rating=Rating;
    this.Image_url=Image_url;
    this.description=description;

    save()
    find()
    findById(HomeId)
    deleteById(homeId)

*/
const { default: mongoose } = require('mongoose');


const homeSchema=mongoose.Schema({
  house_name:{type:String, required: true},
  Location:{type:String,required:true},
  Price:{type:Number, reuired:true},
  Rating:{type:Number,required:true},
  Image_url:String,
  description:String
})

module.exports=mongoose.model("Home",homeSchema);




