const { default: mongoose } = require("mongoose")

const connectDb = async() =>{
    
    try{
        await mongoose.connect("mongodb+srv://BaluPasumarthi:BaluPasumarthi22@firstdb.7argj.mongodb.net/Dev_Connect");
    }
    catch(err){
        console.error("Error in connection", err.message);
    }
};
module.exports = {
    connectDb
}
