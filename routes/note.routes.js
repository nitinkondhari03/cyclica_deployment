const express=require("express")
const noteRouter=express.Router()
const {NoteModel}=require("../model/note.model")
const jwt=require("jsonwebtoken")

noteRouter.get("/",async(req,res)=>{
      const token=req.headers.authorization
      const decoded=jwt.verify(token,"masai")
      try {
            if(decoded){
                  const notes=await NoteModel.find({"userID":decoded.userID})
                  res.status(200).send(notes)
            }
      } catch (error) {
            res.status(400).send({"msg":error.message}) 
      }
})


noteRouter.post("/add",async(req,res)=>{
      //logic
      try {
            const note=new NoteModel(req.body)
      await note.save()
      res.status(200).send({"msg":"Note add succefully"})
            
      } catch (error) {
           res.status(400).send({"msg":error.message}) 
      }
      
})



noteRouter.patch("/update/:id",async(req,res)=>{
      //logic
     const payload=req.body
     const id=req.params.id
     const note=await NoteModel.findOne({"_id":id})
     const userID_in_note=note.userID
     const userID_making_req=req.body.userID

      try {
            if(userID_making_req!==userID_in_note){
                  res.send({"msg":"You are not authorizaed"})
            }else{
                  await NoteModel.findByIdAndUpdate({_id:id},payload)
            res.send({"msg":"user has been update food"})

            }
            

            
      } catch (err) {
            res.send({"msg":"Cannot update food","error":err.message}) 
      }
      
})



noteRouter.delete("/delete/:id",async(req,res)=>{
      const payload=req.body
     const id=req.params.id
     const note=await NoteModel.findOne({"_id":id})
     const userID_in_note=note.userID
     const userID_making_req=req.body.userID
      try {
            if(userID_making_req!==userID_in_note){
                  res.send({"msg":"You are not authorizaed"})
            }else{
                  await NoteModel.findByIdAndDelete({_id:id},payload)
            res.send({"msg":"user has been delete food"})

            }
            
      } catch (err) {
            res.send({"msg":"Cannot update food","error":err.message}) 
      }
})

module.exports={
      noteRouter
}