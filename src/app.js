const express = require("express");
const { connectDb } = require("./config/database");

const  userModel  = require("./model/user");

const app = express();



app.post("/signup", async (req, res) =>{
    
    try{
        
        const user = new userModel( {
            firstName : "Balu",
            lastName  : "Pasumarthi",
            age       :  25,
            email     : "balupasumarthi@gmail.com",
            password  : "Balu22@@",
        });
    
        await user.save();
        res.send("User Created Successfully");
    }
    catch(err){
        console.error("Error Detected",err.message);
        res.status(401).send("Error creating server");
    }

});

connectDb() 
    .then(() =>{
        console.log("Database Connected");
        app.listen(1234, () => {
            console.log("Server started on port 1234.....");
        });
    })
    .catch((err) => {
        console.log("Error:", err.message);
    });

    