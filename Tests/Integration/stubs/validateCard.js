const {stubPassed: pass,stubFailed:fail} = require("../../Blackbox/helperFunctions");
const User  = require("../../../model/user");
module.exports=async(req,res,next)=>{
 const { _id, passcode } = req.body;
 try {
     const user = await User.findById(_id);
     if (user && user.passcode == passcode){ 
        req.body.user=user; //append user object to request body
        pass("Validate Card");
        next();
     }
     else{
         fail("Validate Card");
         res.status(400).json({msg:"Invalid credentials"});
     } 
 }catch (error) {
    fail("Validate Card"); 
    res.status(500).json({msg:"Server Error"});
 }
}