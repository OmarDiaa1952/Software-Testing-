const router = require("express").Router();

const stub1 = require("./stubs/validateCard");
const stub2 = require("./stubs/validateAmount");
const stub3 = require("./stubs/validateAtm");
const stub4 = require("./stubs/withdraw");
const print = require("../Blackbox/helperFunctions").printToServer;

router.post("/testWithdraw/:id",print(),stub1,stub2,stub3,stub4);


module.exports = router;
