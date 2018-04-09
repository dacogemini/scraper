// Dependencies
const express = require("express");
const mongojs = require("mongojs");
const request = require("request");
const cheerio = require("cheerio");

// Using es6 js promise
// mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
  console.log("Database Error:", error);
});
// =============================================================================
// ALT HOOK: 
// before(done => {
//  mongoose.connect('mongodb://localhost/muber_test');
//  mongoose.connection
//   .once('open', () => done())
//   .on('error', error => {
//     console.warn('Warning', error);
//   });
// });
// =============================================================================
// Main route (simple Hello World Message)
app.get("/", function (req, res) {
  res.send("Welcome to the POST!");
});

// Retrieve data from the db
app.get("/all", function (req, res) {
  // Find all results from the scrapedData collection in the db
  db.scrapedData.find({}, function (error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as json
    else {
      res.json(found);
    }
  });
});

// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function (req, res) {

  // Make a request call to grab the HTML body from the site of your choice
  request("https://medium.com/javascript-scene", function (error, response, html) {

    // Load the HTML into cheerio and save it to a variable
    // '$' = shorthand for cheerio's selector command
    var $ = cheerio.load(html);
    // var results = [];

    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works
    $("div.row").each(function (i, element, ) {

      // var link = $(element).children().attr("href");
      var title = $(element).children().text();
      var link = $(element).find("a").attr("href");

      // Save these results in an object that we'll push into the results array we defined earlier

      if (title && link) {

        db.scrappedData.insert({
            title: title,
            link: link
          },
          function (err, inserted) {
            if (err) {
              // Log the error if one is encountered during the query
              console.log(err);
            } else {
              // Otherwise, log the inserted data
              console.log(inserted);
            }
          });
      };

      // Send a "Scrape Complete" message to the browser
      res.send("Scrape Complete");

    });
  });
});


// Listen on port 3000
app.listen(4000, function () {
  console.log("App running on port 4000!");
});