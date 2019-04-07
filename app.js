const sqlite3 = require("sqlite3").verbose();

var bodyParser = require("body-parser");
var express = require("express");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
    console.log("Server started");
});