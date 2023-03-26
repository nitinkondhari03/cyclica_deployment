const jwt=require("jsonwebtoken")


const auth=(req,res,next)=>{
      const token=req.headers.authorization
      if(token){
            const decoded=jwt.verify(token,"masai")
            
           if(decoded){
            console.log(decoded)
            req.body.userID=decoded.userID
            next()
           }else{
            res.status.send({"msg":"Please Login first"})
           }
      }else{
            res.send({"msg":"Please Login first"})
      }

}

module.exports={auth}