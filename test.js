#! /usr/bin/env node

var config 	= require("./config.js");
var home 	= config.home;
var c 		= config.color;
var fs 		= config.fs;
var fse 	= config.fse;

//COPY CONDITION CONFIGURATION
var copy_config = {
						forceDelete: 		false,	//force file deletion
						excludeHiddenUnix: 	true,	//exclude hidden *nix files
						preserveFiles: 		true,	//preserve already existing files
						preserveTimestamps: true,	//Keep the original file timestamps
						inflateSymlinks: 	true,	//Translate symbolic links into files
						//filter: 			"",   	//Filter against an expression such that if( filter == true ){ do nothing; }
						//whitelist: 			false,	//if( whitelist == true && ( filter != true ) ) { ignore file }
						//include: 			"",		//Include filter ( regex || function )
						//exclude: 			""		//Exclusion filter ( regex || function )
				  };

//THE FRAME DIRECTORY STRUCTURE CREATOR
var mkdirs = function( homedir ){
	
homedir = homedir || "framify\ test\ application";

	//THE BASIC FILE SYSTEM STRUCTURE OBJECT ( FOR FILE CREATION )
	
	this.dirs = {
		
					main: 		[ homedir, "assets" ],
					config: 	[ homedir, "assets", "config" ],
					controllers:[ homedir, "assets", "controllers" ],
					css:		[ homedir, "assets", "css" ],
					js: 		[ homedir, "assets", "js" ],
					img: 		[ homedir, "assets", "img" ],
					views: 		[ homedir, "assets", "views" ],
					directives: [ homedir, "assets", "directives" ],
					factories: 	[ homedir, "assets", "factories" ],
					node:		[ homedir, "assets", "node_modules" ]					
					
				};	
	
	
	//FILE SOURCES		
	this.fromFiles = {
		
					main: 		[ home, "assets" ],
					config: 	[ home, "assets", "config" ],
					controllers:[ home, "assets", "controllers" ],
					css:		[ home, "assets", "css" ],
					js: 		[ home, "assets", "js" ],
					img: 		[ home, "assets", "img" ],
					views: 		[ home, "assets", "views" ],
					directives: [ home, "assets", "directives" ],
					factories: 	[ home, "assets", "factories" ],
					node:		[ home, "assets", "node_modules" ]	
						
				};
	
	//FILE DESTINATIONS	
	this.toFiles = {
		
					main: 		[ homedir, "assets" ],
					config: 	[ homedir, "assets", "config" ],
					controllers:[ homedir, "assets", "controllers" ],
					css:		[ homedir, "assets", "css" ],
					js: 		[ homedir, "assets", "js" ],
					img: 		[ homedir, "assets", "img" ],
					views: 		[ homedir, "assets", "views" ],
					directives: [ homedir, "assets", "directives" ],
					factories: 	[ homedir, "assets", "factories" ],
					node:		[ homedir, "assets", "node_modules" ]	
						
				};
	
				
	//CREATE THE REQUIRED FILES RECURSSIVELY
	for (var key in this.fromFiles ) {
		if (this.toFiles.hasOwnProperty(key)) {
			
			//doDir( this.dirs[key], this.fromFiles[key], this.toFiles[key] ); 
			//console.log( this.fromFiles[key].join().replace(/,/g, "/").replace( /\/\//g, "/") +" <=== "+ this.toFiles[key].join().replace(/,/g, "/").replace( /\/\//g, "/") );
			doFiles(  this.fromFiles[key].join().replace(/,/g, "/").replace( /\/\//g, "/").toString(), this.toFiles[key].join().replace(/,/g, "/").replace( /\/\//g, "/").toString()  );
			//console.log( ( this.fromFiles[key] ).join().replace(/,/g, "/").replace( /\/\//g, "/") );
						
		}
	}	
				
};


//CREATE THE PATHS RECCURSIVELY
var doDir = function ( dirpath, fromFiles, toFiles ){

	var count;
		
	var currpath = "";
	for( count = 0; count < dirpath.length; count++ ){
		
		currpath += dirpath[count] +"/";
		
		if( !fs.existsSync( currpath) ){
			
			fs.mkdirSync( currpath );
			if( count == ( dirpath.length - 1 ) ){  }
			 
		}else{
			//console.log("\n\nFAILED TO CREATE THE DIRECTORY '" + currpath + "'\nPlease ensure:\n\t -> It does not already exist \n\t -> You have permission to modify the current folder.");
		}		
				
	}	
	
};


//MOVE THE INITIALIZATION FILES TO THE RESPECTIVE DIRECTORIES
var doFiles = function( fromFiles, toFiles ){
	
	fse.copyRecursive( fromFiles, toFiles, function(err){
		if(!err){
			console.log("@framify\n".success + "initialized \t".info +  toFiles + "\n" );
		}else{
			console.log("@framify\n".err + "Failed \t" + err.message);
		}
	});
	//wrench.copyDirSyncRecursive( fromFiles, toFiles, copy_config );
	
};


mkdirs( process.argv[2] );

var crypto = require("./crypto.js");
var sha256 = crypto.sha256;