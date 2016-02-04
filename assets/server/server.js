require("bixbyte-frame");
app.port    = app.port || 5000;

db("mongo", "appname").then(function(){
	
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
	
	//!HENDLE THE REGISTRATION OF NEW USERS
	app.route("/register")
	.all(function(req,res){
		
		//* AUTHENTICATE THE PROVIDED DATA
		// CHECK IF THE PASSOWRDS MATCH
		if( req.body.password === req.body.password2 && req.body.password != undefined && req.body.password != null ){
			
			var userParams = {
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
			};
			
			db.framify(userParams)
			.then(function(r){
				console.log(r);
				res.send(r);
			})
			.catch(function(e){
				console.log( str(e.data.message) );
				res.send(e);
			})
			// schema.User.newUser( userParams )
			// .then( function(d){
			// 	res.send(d);
			// })
			// .catch(function(e){
			// 	res.send(e);
			// });
				
			
		}else{
			
			res.send( makeResponse( 500, "Your Passwords don't match." ) );
			
		}
		
		
		
	})
	
	//!THE SERVER STARTUP FILE
	server.listen(app.port ,function(err){
		if(!err){
			console.log("Listening on port "+ app.port );
		}
	});

});