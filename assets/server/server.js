var http = require("http");
var express =require("express");
process.env.PORT    = 5000;

var app = express();

//!ALLOW CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  next();
});

//!SET THE BASIC DIRECTORY MIDDLEWARE
app.use(express.static(__dirname + '/../'));
//app.use(express.static(__dirname + '/../config/'));

//!ROOT ROUTE
app.route("/").all(function(req,res){
	res.sendFile( "index.html");
});

//!ROUTE LEADING TO THE HOME DIRECTORY
app.route("/sample/:iara").all(function(req,res){
    var i = req.params.iara;
    res.sendFile( i ,{ "root": __dirname + "/../" });
});

//!ROUTE LEADING TO THE CONFIGURATION FILE DIRECTORY 
app.route("/config/:fname").all(function(req,res){
    console.log("getting the file" + req.params.fname)
    res.sendFile(req.params.fname, { "root": __dirname + "/../config/"} )
});

//!THE SERVER STARTUP FILE
var server = http.createServer(app).listen(process.env.PORT ,function(err){
	if(!err){
		console.log("Listening on port "+ process.env.PORT );
	}
});