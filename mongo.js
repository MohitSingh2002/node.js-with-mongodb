const mongoose = require("mongoose");
const mongoDBErrors = require("mongoose-mongodb-errors");
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.plugin(mongoDBErrors);
mongoose.connect("mongodb://localhost:27017/MyDB",
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true},
    (req, res) => {
        console.log("Connected To MongoDB");
    });
