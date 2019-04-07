const sqlite3 = require("sqlite3").verbose();

var bodyParser = require("body-parser");
var express = require("express");
var app = express();

let db = new sqlite3.Database("./db/addressBook.db", (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log("Database connected");
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 8080);

app.get("/", (request, response) => {
    response.render("index");
});

app.get("*", (request,response) => {
    console.log("Unexpected GET");
    response.render("index");
});

const server = app.listen(app.get('port'), () => {
    console.log("Server started");
});