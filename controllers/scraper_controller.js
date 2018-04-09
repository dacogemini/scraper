const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

// Requiring models
var Note = require("./../models/Notes.js");
var Articles = require("./../models/Articles.js");

router.get('/', function (req, res) {
});

router.get('/scrape', function (req, res) {
    request("https://www.theonion.com", function(error, response, html) {

      // Load the HTML into cheerio and save it to a variable
      var $ = cheerio.load(html);

      // An empty array to save the data that we'll scrape
      var results = [];

      // With cheerio, find each p-tag with the "title" class
      // (i: iterator. element: the current element)
      $("a.js_curation-click").each(function(i, element) {
        // Save the text of the element in a "title" variable
        var title = $(element).text();

        // In the currently selected element, look at its child elements (i.e., its a-tags),
        // then save the values for any "href" attributes that the child elements may have
        var link = $(element).attr("href");
        console.log(title, link);

        // Save these results in an object that we'll push into the results array we defined earlier
        results.push({
          title: title,
          link: link
        });
        $(".content-meta__excerpt").each(function(i, element) {
          // Save the text of the element in a "title" variable
          var summary = $(element).children().text();
          console.log("summary" + summary);
          console.log(element);
          // Save these results in an object that we'll push into the results array we defined earlier
          results.push({
              summary: summary
          });
        });

      });

      // Log the results once you've looped through each of the elements found with cheerio
      console.log(results);
    });


}); // router.get '/scrape'

router.get('/article/:id', function (req, res) {



}); // router.post '/homes'

router.post('/article/:id', function (req, res) {


}); // router.post '/homes'

module.exports = router;