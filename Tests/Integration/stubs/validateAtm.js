const {stubPassed: pass,stubFailed:fail} = require("../../Blackbox/helperFunctions");
const ATM = require("../../../model/atm");
module.exports=async(req,res,next)=>{
 const {amount} = req.body;
 const atm = await ATM.findOne({}).exec();
 try {
    const balances = atm.balance;
    const atmBalance = Object.entries(balances).reduce(
        (total, [key, value]) => total + value * +key.substring(1),
        0
    );

    if (amount > atmBalance){
        fail("Validate ATM"); 
        res.status(400).json({msg:"Insufficient amount in ATM"});
    }
    else{
        pass("Validate ATM");
        next();
    }

 }catch (error) {
    fail("Validate ATM"); 
    res.status(500).json({msg:"Server Error"});
 }
}