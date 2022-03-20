const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
    name: { type: String, required: true },
    balance: { type: Number, required: true },
    passcode: { type: Number, required: true, min: 1000, max: 9999 },
});

module.exports = mongoose.model("User", usersSchema);
