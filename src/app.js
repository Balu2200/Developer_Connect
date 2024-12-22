const express = require("express");
const { connectDb } = require("./config/database");

const  userModel  = require("./model/user");

const app = express();


app.use(express.json());  // converts the json data to js object 

app.post("/signup", async (req, res) =>{
    
    try{
        const user = new userModel(req.body);
        await user.save();
        res.send("User Created Successfully");
    }
    catch(err){
        console.error("Error Detected",err.message);
        res.status(401).send("Error creating server");
    }

});

app.get("/user", async (req, res)=>{

    const userEmail = req.body.email;
    
    try{
        const user = await userModel.findOne({email:userEmail});

        if(user.length ===0){
            res.status(404).send("User not found");
        }
        else{
            res.send(user);
        }
    }
    catch(err){
        res.status(401).send("Something went wrong");
    }
});

app.delete("/delete", async(req,res)=>{

    const userId = req.body.userId;
    try{

        const user =  await userModel.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }
    catch(err){
        res.status(401).send("Something went wrong");
    }
});

app.get("/feed" ,async(req, res)=>{

    try{
        const users = await userModel.find({});
        res.send(users);
    }
    catch(err){
        res.status(401).send("Something went wrong");
    }

});

app.patch("/update", async(req, res) =>{

    const userId = req.body.userId;
    const data = req.body;
    try{
        const user = await userModel.findByIdAndUpdate({_id:userId}, data);
        res.send("Data updates successfully");
    }
    catch(err){
        res.status(401).send("Something went wrong");
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

    