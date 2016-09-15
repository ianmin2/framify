// (function() {
//     var childProcess = require("child_process");
//     var oldSpawn = childProcess.spawn;
//     function mySpawn() {
//         console.log('spawn called');
//         console.log(arguments);
//         var result = oldSpawn.apply(this, arguments);
//         return result;
//     }
//     childProcess.spawn = mySpawn;
// })();

require("bixbyte-frame");

//** SETUP THE MAIL SERVER 
/**
 * YOU NEED A mailgun API KEY TO SEND EMAIL USING FRAMIFY. 
 * to get one, please signup on https://mailgun.com
 */
var mail = mailgun('YOUR_MAILGUN_API_KEY');

//** SETUP THE PHP CGI
app.use("/php", php.cgi(`${__dirname}/../php`) );

//app.port    = app.port || 5000;

//!SET THE BASIC DIRECTORY MIDDLEWARE
app.use(express.static( __dirname + '/../'));

//!ROOT ROUTE
app.route("/").all(function(req,res){
	res.sendFile( "index.html");
});

app.route("/login").all( (req,res) => {
	//console.log( JSON.stringify(fs.readFileSync(`${__dirname}/../login.html`,'utf8'),null,2) )
	res.send(fs.readFileSync(`${__dirname}/../login.html`,'utf8'));
})

//!ROUTE LEADING TO THE HOME DIRECTORY
app.route("/sample/:iara").all(function(req,res){
	var i = req.params.iara;
	res.sendFile( i ,{ "root": __dirname + "/../" });
});

//!ROUTE LEADING TO THE CONFIGURATION FILE DIRECTORY 
app.route("/config/:fname").all(function(req,res){
	c_log("getting the file" + req.params.fname)
	res.sendFile(req.params.fname, { "root": __dirname + "/../config/"} )
});


//!THE SERVER STARTUP FILE
server.listen(app.port ,function(err){
	if(!err){
		log(`Running server on `.success + `http://${myAddr}:${app.port}`.err);
	}
});	