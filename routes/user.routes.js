const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {UserModel}=require("../model/user.model")
const userRouter=express.Router()


//registration
userRouter.post("/register",async(req,res)=>{
      const {email,pass,location,age}=req.body
      try {
            bcrypt.hash(pass, 5, async(err, hash)=> {
             const user=new UserModel({email,pass:hash,location,age})
             await user.save()
      res.status(200).send({"msg":"Registration has been done!"})
                  // Store hash in your password DB.
              })
            
      } catch (error) {
           res.status(400).send({"msg":error.message}) 
      }
})


//login(authentication)
userRouter.post("/login",async(req,res)=>{
      const {email,pass,userID}=req.body
      try {
      const user=await UserModel.findOne({email})
      if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                  if(result){
                        res.status(200).send({"msg":"Login suceessful","token":jwt.sign({ "userID":user._id }, 'masai')})
                  }else{
                        res.status(400).send({"msg":"Login Failed!"}) 
                  }
            }) 
      }
          
} catch (error) {
           res.status(400).send({"msg":error.message}) 
      }
})



userRouter.get("/details",(req,res)=>{
      const token=req.headers.authorization
      jwt.verify(token, 'masai',(err, decoded) =>{
            decoded?res.status(200).send("user Details"): res.status(400).send({"Msg":err.message})
          })
})

userRouter.get("/moviedata",(req,res)=>{
      const {token}=req.query
      jwt.verify(token, 'masai',(err, decoded) =>{
            decoded?res.status(200).send("Movie"): res.status(400).send({"Msg":err.message})
          })
})

module.exports={userRouter}