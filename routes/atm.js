const router = require("express").Router();
const {
    getBalance,
    withdraw,
    deposit,
    newUser,
    resetATM,
} = require("../controllers/atm");

router.get("/balance/:id", getBalance);
router.get("/reset", resetATM);
router.post("/withdraw", withdraw);
router.post("/deposit", deposit);
router.post("/newUser", newUser);

module.exports = router;
