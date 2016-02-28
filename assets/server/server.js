require("bixbyte-frame");
require( __dirname + "/../schema/mother.js");
var formGen 	= require( __dirname + "/formGenerator.js");
var formPack 	= require( __dirname + "/formStacker.js");

db("mongo","mama")
.then(function(e){
	
	db.framify({
		username: "bixbyte",
		password: "bixbyte",
		first_name: "PROJECT 1",
		email: "info@bixbyte.cf"
	})
	.then(function(e){
		
		console.log("\nWelcome to @framify ");
		
	})
	.catch(function(e){
		console.dir(e);
	})
	.then(function(d){
		
		//** SETUP THE PHP CGI
		app.use("/php", php.cgi("./php"));
		
		app.port    = app.port || 5000;
		
		//!SET THE BASIC DIRECTORY MIDDLEWARE
		app.use(express.static( __dirname + '/../'));
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
		
		
		//!HANDLE FORM FRAME CREATION
		app.route("/formify")
		.all(function(req,res){
			// res.send( "done" )
			// console.log(req.body)
			if(req.body.formName && req.body.formData  ){ 
				res.send( formGen(req.body.formName, json(req.body.formData)  ) );
			}else{
				res.send(500, "Failed to capture the required form fields");
				log("\n@framify -> formGenerator".info + "\nFailed to capture the essential parameters ".err + "formName".yell + " and/or ".err + "formData".yell + "\nCaptured:\n".info + str(req.body) )
			}
		});
		
		app.route("/@auto/@formify")
		.all(function(req,res){
			
			var formSchemas = require( __dirname + "/../schema/forms/main.min.js" ) ;
			
			if( formSchemas[0] ){
				
				//@ SPLIT THE SCHEMA INTO FORMLY PARSEABLE JSON FORMAT
				var details = [];
				formSchemas.forEach(function(formSchema){
					 details.push( formGen( formSchema.formName, formSchema.formData ).data.message ) ;
				});
				
				//@ AGGREGATE THE GENERATED FILES INTO A SINGLE 
				formPack()
				.then(function(r){
					res.send(makeResponse(200, r ));					
				})
				.catch(function(err){
					res.send(makeResponse(500, err));
				})
				.then(function(){
					log("FORM PACKING DONE!!".info);
					delete require.cache[require.resolve(__dirname + "/../schema/forms/main.min.js" )];
				})
				//res.send(makeResponse(200,"Done!",details));
				
			}else{
				
				req.send(makeResponse(500,"Failed to read a schema the minified main schema file!"));
				delete require.cache[require.resolve(__dirname + "/../schema/forms/main.min.js" )];
				log("FAILED TO GENERATE NEW FORM SCHEMA".err + "\n\tPlease ensure that the main.min.js file in schema/forms/ has at least one object".yell)
			}
			
			
		});
		
		
		//!THE SERVER STARTUP FILE
		server.listen(app.port ,function(err){
			if(!err){
				console.log("Listening on port "+ app.port );
			}
		});	
		
	})
	
	
})
