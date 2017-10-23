/* Students: Using the tools and techniques you learned so far,
 * you will scrape a website of your choice, then place the data
 * in a MongoDB database. Be sure to make the database and collection
 * before running this exercise.

 * Consult the assignment files from earlier in class
 * if you need a refresher on Cheerio. */

// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Main route (simple Hello World Message)
app.get("/", function(req, res) {
  res.send("Hello world");
});

/* TODO: make two more routes
 * -/-/-/-/-/-/-/-/-/-/-/-/- */

// Route 1
// =======
// This route will retrieve all of the data
// from the scrapedData collection as a json (this will be populated
// by the data you scrape using the next route)
app.get('/all', (req, res)=>{
	//get all the documents from our db collection
	db.collections.find({}, (err, docs)=>{
		var data = [];
		//loop through each document and store it in an array called `data`
		for(item of docs){
			data.push(item);
		}
		//send the data to the browser as a JSON file
		res.json(data);
	})
})
// Route 2
// =======
// When you visit this route, the server will
// scrape data from the site of your choice, and save it to
// MongoDB.
// TIP: Think back to how you pushed website data
// into an empty array in the last class. How do you
// push it into a MongoDB collection instead?
app.get('/scrape', (req, res)=>{
	//get the html file from ESPN 
	request('http://www.espn.com/nba/', (err, res, html)=>{
		//make cheerio object with the ESPN html page
		var $ = cheerio.load(html),
		  title, 
		  link;
		  //loop through all the ESPN stories and get the respective headline and links
		$('.contentItem__content--story').each((i, item)=>{
			link = $(item).children().attr('href');
		  	title = $(item).children('a').children('.contentItem__contentWrapper')
		  		.children('.contentItem__title').text();
		  	//use mongojs to save the document with title and link
		  	db.collections.save({"link":link, "item":title});
		});
	});
		  	res.send("Scraping accomplished!")
})
/* -/-/-/-/-/-/-/-/-/-/-/-/- */

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
