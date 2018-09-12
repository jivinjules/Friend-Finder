// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3030;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//This is to use my CSS
app.use(express.static('app/public'));

//returning the function and the additional parantheses are calling the function
require(path.join(__dirname, './app/routing/htmlRoutes'))(app);
require(path.join(__dirname, './app/routing/apiRoutes'))(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});