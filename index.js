import express from "express";
import cors from "cors";
import useRouter from "./router/useRouter.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app=express()
dotenv.config()
app.use(cors())
app.use(express.json())
app.use("/",useRouter)

mongoose.connect(process.env.MONGO_URI)
.then(()=> {

    console.log("suceesful  mongose");
    
    app.listen(3000,()=>{

    console.log("server is start");
})

}) .catch((error)=>  {
     console.log("error",error);
})
