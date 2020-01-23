//require our dependencies
var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//Set up our port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 3000;

//Instantiate our Express App by calling a function; instantiate means to create an instance of an object
var app = express();

//set up an Express Router
var router = express.Router();

//require our routes file pass our router object
require("./config/routes")(router);

//Designate our public folder as a static directory
app.use(express.static(__dirname + "/public"));

//Connect Handlebars to our Express App
app.engine("handlebars", expressHandlebars({
    defaultLayout:"main"
}));
app.set("view engine", "handlebars");

//Use bodyParser in our app
app.use(bodyParser.urlencoded({
    extended: false
}));

//Have every request go through our router middleware
app.use(router);

//if deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadLines";

//Connect mongoose to our database, log errors
mongoose.connect(db, function(error){
if (error){
    console.log(error);
}
//or log a success message
else{
    console.log("mongoose connection is succesful");
}
});
//Listen on the port
app.listen(PORT, function() {
    console.log("Listening on port:" + PORT);
});
