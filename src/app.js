const express = require("express");
const { connectDb } = require("./config/database");

const  userModel  = require("./model/user");

const app = express();


app.use(express.json());  // converts the json data to js object 

app.post("/signup", async (req, res) => {
    const data = req.body;

    try {
        const Allowed = ["firstName", "lastName", "email", "password", "age", "gender","photoUrl","about", "skills"];
        const isAllowed = Object.keys(data).every((k) => Allowed.includes(k));

        if (!isAllowed) {
            return res.status(400).send("Please enter valid data only.");
        }

        if (data.skills && Array.isArray(data.skills) && data.skills.length > 15) {
            return res.status(400).send("You can add only up to 15 skills.");
        }
    
        if (data.age < 15) {
            return res.status(400).send("Your age must be above 15.");
        }

        const user = new userModel(data);
        await user.save();
        return res.status(201).send("User Created Successfully");
    } catch (err) {
        console.error("Error Detected:", err.message);
        return res.status(500).send("Error creating server");
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
        // API level Validations
        const Allowed =["userId","photoUrl","about","gender","Skills"]
        const isAllowed = Object.keys(data).every((k)=> Allowed.includes(k));
        if(!isAllowed){
            res.send("Update not allowed");
        }
        if(data.Skills && Array.isArray(data.Skills) && data.Skills.length>15){
            return res.send("You can add only 15 skills")
        }
        const user = await userModel.findByIdAndUpdate({_id:userId}, data, { runValidators: true });
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

    