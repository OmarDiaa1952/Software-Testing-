const {stubPassed: pass,stubFailed:fail} = require("../../Blackbox/helperFunctions");
const Trans = require("../../../model/trans");
module.exports=async(req,res,next)=>{
 const { _id, user,date,amount} = req.body;
 try {
    const oldBalance = user.balance;
    user.balance -= amount;
    const newTrans = new Trans({
        by: _id,
        amount,
        date,
        action: 0,
    });
    Promise.all([newTrans.save(), user.save()]).then((result) =>{
        pass("Withdraw");
        res.json({
            amount,
            oldBalance,
            balance: user.balance,
        })
    }
    );
 }catch (error) {
    fail("Withdraw");  
    res.status(500).json({msg:"Server Error"});
    console.log(error);
 }
}