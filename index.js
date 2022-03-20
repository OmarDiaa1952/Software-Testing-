const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index");

const db = mongoose.connect("mongodb://localhost:27017/atm");

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST,GET,PUT,PATCH,DELETE,OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
});

app.use(express.json());

app.use("/", routes);
app.use((err, req, res, next) => {
    res.status(400).json({ err: err.message });
});
db.then(() => {
    app.listen(3000);
}).catch((err) => console.log(err));
