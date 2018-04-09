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
before((done) => {
    // mongoose connect to mongo
    mongoose.connect('./controller/scraper_controller.js');
    mongoose.connection
        .once('open', () => { //! mongoose looks for an event called open, then runs code
            done();
        }) 
        .on('error', (error) => {
            console.warn('Warning!', error);
        });
})
// Hook
beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        // Ready to run the next text
        done();
    });
});

// Listen on port 8080
app.listen(PORT, function () {
    console.log("App running on PORT " + PORT);
});