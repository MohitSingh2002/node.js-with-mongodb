const express = require("express");
require("express-async-errors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//database connection
require("./mongo");

//Model
require("./model/Post");
require("./model/Comment");

//Middleware
app.use(bodyParser.json());

const Port = process.env.PORT || 4000

//Routes
app.use("/posts", require("./routes/posts"));

// //Routes not found
// app.use((req, res, next) => {
//     req.status = 404;
//     const error = new Error("Route Not Found.");
//     next(error);
// });

// //Error handler
// app.use(() => {
//     req.status(req.status || 500).send({
//         message: error.message,
//         stack: error.stack
//     });
// });

app.route("/").get((req, res) => {
    res.json("Mohit Singh");
});

app.listen(Port, () => {
    console.log("Listening on Port : 4000");
});
