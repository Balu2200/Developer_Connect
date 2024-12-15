const express = require("express");

const app = express();

app.use("/home", (req, res)=>{
    res.send("Welcome to Developers connect");
})

app.listen(3000, ()=>{
    console.log("Server started .....")
})