const mongoose = require("mongoose");
const mongoDBErrors = require("mongoose-mongodb-errors");
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.plugin(mongoDBErrors);
mongoose.connect("mongodb+srv://codeowl:codeowl@cluster0.gs9gk.mongodb.net/AppDB?retryWrites=true&w=majority",
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true},
    (req, res) => {
        console.log("Connected To MongoDB");
    });
