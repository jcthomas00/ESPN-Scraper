# ESPN NBA Scraper

This is an application that scrapes the ESPN NBA homepage to store the story headlines and links in a local No-SQL Mongo DB. It uses the the mongojs npm package to create the db, collection and documents.

## Running It Locally

To run the file locally follow the following steps:

1. Clone this git repository
2. Run Mongo DB on port 27017 (the defaults port)
3. Navigate to the cloned repo in another terminal and type `npm install` to get dependencies
4. Run the file by typing `node server.js`
5. Navigate to http://localhost:3000/scrape to start the scraping
6. Navigate to http://localhost:3000/all to see results that were saved in the DB
