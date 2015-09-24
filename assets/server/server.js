var http = require("http");
var express =require("express");
process.env.PORT    = 5000;

var app = express();

app.use( express.static( __dirname + "/../" ) );

app.route("/").all(function(req,res){
	res.sendFile( "index.html");
});


var server = http.createServer(app).listen(process.env.PORT ,function(err){
	if(!err){
		console.log("Listening on port "+ process.env.PORT );
	}
});;
