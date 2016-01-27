require("bixbyte-rame");
app.port    = app.port || 5000;

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
server.listen(app.port ,function(err){
	if(!err){
		console.log("Listening on port "+ app.port );
	}
});