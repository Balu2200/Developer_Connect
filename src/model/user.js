const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        firstName :{
            type : String,
            required:true,
            minLength:4,
            maxLength:50
        },
        
        lastName :{
            type : String,
            required:true,
            minLength:4,
            maxLength:50
        },

        email :{   
            type : String,
            trim:true,
            lowercase:true,
            required:true,
            unique:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error ("Invalid email address");
                }
            }

        },
        
        password:{
            trim:true,
            type:String,
            required:true,
            validate(value){
                if(!validator.isStrongPassword(value)){
                    throw new Error ("Enter a strong password");
                }
            }
        },
        age:{
            type:Number,
            min:15
        },

        gender :{
            type:String,
            validate(value){   
                if(!["male","female","others"].includes(value)){
                    throw new Error("Gender Data is not valid");
                }
            }
        },

        sbout:{
            type:String,
            default:"This is a default About of the user"
        },

        photoUrl:{
            type:String,
            validate(value){
                if(!validator.isURL(value)){
                    throw new Error ("Invalid photoURL address");
                }
            }
        },

        skills:{
            type:[String]
        }
    },
    {
        timestamps:true
    }
);


const userModel = mongoose.model("user", userSchema);

module.exports = userModel;