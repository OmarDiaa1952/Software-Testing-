const mongoose = require("mongoose");

const transSchema = mongoose.Schema({
    action: Boolean, // 0 = withdraw, 1 = deposit
    by: mongoose.Schema.Types.ObjectId,
    amount: Number,
    date: String,
});

module.exports = mongoose.model("Trans", transSchema);
