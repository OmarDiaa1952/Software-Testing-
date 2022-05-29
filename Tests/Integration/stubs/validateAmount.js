const {stubPassed: pass,stubFailed:fail} = require("../../Blackbox/helperFunctions");
const Trans = require("../../../model/trans");

module.exports=async(req,res,next)=>{
 const {amount,_id,user} = req.body;
 const date = new Date().toISOString().substring(0, 10);
 const error = () => {
    fail("Validate Amount"); 
    res.status(400).json({msg:"Invalid withdraw amount"});
 }
 try {
    if (user.balance - amount < 100) error();
    else if (amount < 50) error();
    else if (amount % 50 != 0) error();
    else if (amount > 10000) error();
    else {
        const trans = await Trans.find({ by: _id, date, action: 0 });
        let withdrawnToday = 0;
        trans.forEach((t) => (withdrawnToday += t.amount));
        if (withdrawnToday > 15000) error();
        else{
            req.body.date = date;
            pass("Validate Amount");
            next();
        }
 }
}
 catch (error) {
    fail("Validate Amount"); 
    res.status(500).json({msg:"Server Error"});
 }
 }
