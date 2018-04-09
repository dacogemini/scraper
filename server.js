// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// global promise
mongoose.Promise = global.Promise;

// Scraping tools
var request = require("request");
var cheerio = require("cheerio");

var PORT = process.env.PORT || 8080;

// Initialize Express
var app = express();

// Serve static content
app.use(express.static("public"));

// Handlebars
var exphbs = require("express-handlebars");
// Set Handlebars as default view engine
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/scraper_controller.js");

app.use("/", routes);
mongoose.connect();
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// logging into mongoosedb
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Listen on port 8080
app.listen(PORT, function () {
    console.log("App running on PORT " + PORT);
});