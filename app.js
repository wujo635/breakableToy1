const sqlite3 = require("sqlite3").verbose();

var bodyParser = require("body-parser");
var express = require("express");
var faker = require("faker");
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

app.post("/add", (request, response) => {
   var firstName = faker.name.firstName();
   var lastName = faker.name.lastName();
   var phoneNumber = faker.phone.phoneNumber();
   console.log(firstName, lastName, phoneNumber);
   response.redirect("/");
});

app.get("*", (request,response) => {
    console.log("Unexpected GET");
    response.render("index");
});

const server = app.listen(app.get('port'), () => {
    console.log("Server started");
});

process.on("SIGINT", () => {
    console.log("Server shutdown started");
    db.close((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("DB successfully shutdown");
        }
    });
    server.close(() => {
        console.log("Http server closed.");
        process.exit(0);
    });
});