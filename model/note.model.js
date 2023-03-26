const mongoose=require("mongoose")


//users Schema
const userSchema=mongoose.Schema({
      title:String,
      body:String,
      sub:String,
      userID:String
},{
      versionkey:false
})

const NoteModel=mongoose.model("notes",userSchema)

module.exports={NoteModel}
