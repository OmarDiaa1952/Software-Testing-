const router = require("express").Router();
const atmRoute = require("./atm");

router.use("/atm", atmRoute);

module.exports = router;
