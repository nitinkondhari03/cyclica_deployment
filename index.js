const express=require("express")
const cors=require("cors")
require("dotenv").config()
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {noteRouter}=require("./routes/note.routes")

const {auth}=require("./middleware/auth.middleware")
const app=express()

app.use(express.json())
app.use(cors())
app.use("/user",userRouter)
app.use(auth)
app.use("/notes",noteRouter)
//registration




app.listen(process.env.port,async()=>{
      try {
            await connection
            console.log(`connected to the DB with port ${process.env.port}`)
      } catch (err) {
            console.log("Cannot connect to DB")
            console.log(err)
      }
      console.log("server is runnig at port 4500")
})