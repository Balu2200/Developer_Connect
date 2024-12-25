const express = require("express");
const { connectDb } = require("./config/database");
const {userAuth} = require("./middlewares/auth");

const  userModel  = require("./model/user");
const  {validateSignUpData} = require("./utils/validations");
const  bcrypt = require("bcrypt");
const  cookieParser = require("cookie-parser");
const  jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
   
    try {

        const data = validateSignUpData(req);
        const {firstName, lastName, email, password} = data
        const passwordhash = await bcrypt.hash(password, 10);

        const user = new userModel({firstName, lastName, email, password:passwordhash});
        await user.save();
        return res.status(201).send("User Created Successfully");

    } catch (err) {
        
        console.error("Error Detected:", err.message);
        return res.status(500).send("Error:"+ err.message);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Email and password are required.");
        }

        const user = await userModel.findOne({ email: email });
        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await user.validatePassword(password);
        
        if (isPasswordValid) {
            const token = await user.getJWT();

            res.cookie("token", token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
            res.send("Login successful");
        } else {
            throw new Error("Invalid password");
        }
        } catch (err) {
        res.status(401).send("Error: " + err.message);
        }
    });

app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(401).send("Something went wrong: " + err.message);
    }
});

app.post("/sendConnectionRequest", userAuth, async(req, res) =>{

    res.send("sending");
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

    