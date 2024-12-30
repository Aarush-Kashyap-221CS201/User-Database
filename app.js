require("dotenv").config();

const express=require('express');
app=express();

app.use(express.urlencoded({ extended: true }));

const path = require('path');
app.set("views", path.join(__dirname, "views")); 
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

const userRouter=require('./routes/userRouter');
app.use("/",userRouter);

const port=process.env.PORT;
app.listen(port,()=>{
    console.log("Server started...");
})