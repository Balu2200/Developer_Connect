
const adminAuth = (req, res,next) =>{
    
    const token = "xyz";
    const isAuthorised = token === "xyz";
    if(!isAuthorised){
        res.status(401).send("Error");
    }
    else{
        next();
    }
};
const userAuth = (req, res,next) =>{
    
    const token = "xyz";
    const isAuthorised = token === "xyz";
    if(!isAuthorised){
        res.status(401).send("Error");
    }
    else{
        next();
    }
};

module.exports ={
    adminAuth,
    userAuth
}