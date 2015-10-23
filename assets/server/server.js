var http = require("http");
var express =require("express");
process.env.PORT    = 5000;

var app = express();

app.use(express.static(__dirname + '/../'));
app.use(express.static(__dirname + '/../config/'));

app.route("/").all(function(req,res){
	res.sendFile( "index.html");
});

app.route("/config/:fname").all(function(req,res){
    console.log("getting the file" + req.params.fname)
    res.sendFile(req.params.fname, { "root": __dirname + "/../config/"} )
});


var server = http.createServer(app).listen(process.env.PORT ,function(err){
	if(!err){
		console.log("Listening on port "+ process.env.PORT );
	}
});;
