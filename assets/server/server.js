require("bixbyte-frame");

//** SETUP THE PHP CGI
app.use("/php", php.cgi("./php"));

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

//!HANDLE USE ADDITION
app.route("/register")
.all(function(req,res){
	
	//!ENSURE THAT THE PASSWORDS ARE THE SAME
	if( req.body.password && ( req.body.password === req.body.password ) ){
		
		var authParams = {
			username 	: req.body.username,
			password 	: req.body.password,
			email		: req.body.email,
			first_name	: req.body.first_name,
			last_name	: req.body.last_name,
			telephone	: req.body.telephone,
			postal_address :req.body.postal_address,
			city		: req.body.city,
			zip			: req.body.zip,
			country		: req.body.country			
		}
		
		//console.dir(authParams)
		
		schema.User.newUser(authParams)
		.then(function(d){
			console.log("It worked, the user was registered!");
			console.log(str(d));
			res.send(d);
		})
		.catch(function(e){
			console.log("It failed to register the user");
			console.log(str(e));
			res.send(e);
		});
		
	}else{
		
		res.send( makeResponse(500,"Please ensure that your defined passwords match") );
		
	};
	
});

//!HANDLE USER LOGIN
app.route("/login")
.all(function(req,res){
	
	var loginParams = clone(req.body);
	
	schema.User.login(loginParams)
	.then(function(d){
		console.dir(d)
		res.send(d);
	})
	.catch(function(e){
		console.dir(e);
		res.send(e);
	});
	
	
});

//!THE SERVER STARTUP FILE
server.listen(app.port ,function(err){
	if(!err){
		console.log("Listening on port "+ app.port );
	}
});	
		
	
