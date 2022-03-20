const mongoose = require("mongoose");

const atmSchema = mongoose.Schema({
    balance: {
        x50: Number,
        x100: Number,
        x200: Number,
    },
});

module.exports = mongoose.model("Atm", atmSchema);
