const mongoose=require("mongoose")


//users Schema
const userSchema=mongoose.Schema({
      email:String,
      pass:String,
      location:String,
      age:Number
},{
      versionkey:false
})

const UserModel=mongoose.model("user",userSchema)

module.exports={UserModel}
