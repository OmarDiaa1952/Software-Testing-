const router = require("express").Router();
const {
    getBalance,
    withdraw,
    setBalance,
    deposit,
    newUser,
    resetATM,
    resetTrans,
} = require("../controllers/atm");

router.get("/balance/:id", getBalance);
router.get("/resetATM/:amount", resetATM);
router.get("/resetTrans", resetTrans);
router.post("/withdraw", withdraw);
router.post("/deposit", deposit);
router.post("/set", setBalance);
router.post("/newUser", newUser);

module.exports = router;
