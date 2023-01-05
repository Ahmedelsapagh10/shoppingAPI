
const jwt=require('jsonwebtoken');
const JWT_KEY="secret";
const mongoose=require('mongoose')
module.exports=(req,res,next)=>{
    try{ 
        const decoded=jwt.verify(req.body.token,JWT_KEY);
      req.userData=decoded;
    next()
   
}
catch{
    res.status(404).json({
        message:"User have Dont have Auth"
    })
}

}