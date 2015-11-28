//BASIC IMPORTS
global.fs 		= require("fs");
global.fse 		= require("fs.extra");
global.path 	= require('path');
global.c   		= require("colors");
global.crypto  	= require("./crypto.js");


//SET THE MODE FOR THE EVENT LOGGER { true === "verbose mode" && false === "log to file only" }
global.dev	 	= true;

//GET THE SCRIPT INSTALLATION DIRECTORY
global.home = path.dirname( fs.realpathSync( __filename ) ) + "/";

//THE PATH TO THE LOG FILE
global.log_path = global.home + "bixbyte/logs/main.log";

//DEFINE THE COLOR SCHEME
global.cs = c.setTheme({ success:'green', err:'red', info:'blue', gray:'gray', yell:'yellow'});
	
	
	/*!
		DEPENDENT CONFIGURATIONS
	*/
	
//FETCH THE BIXBYTE EVENT LOGGER
global.log = require("./logger.js")(global.log_path, global.dev);

//FETCH THE BIXBYTE APPLICATION INFO OBJECT
global.appInfo = require("./appinfo.js")(global.fs, global.home, global.cs);
	

//THE BIXBYTE CLOUD INITIALIZER SERVICE
global.cloud_init = function( repo_data ){
	
					if( repo_data.response ){
						
						log("@framify".success + "\nInitializing cloud services for the project ".info + repo_data.message.name );
					
					}else{
						
						log('@framify\nFailed to initialize cloud services for the project '.err + repo_data.message.name + '\nYou have to ' + 'set'.info +' the' + ' github '.yell +' and ' +'google drive'.yell + ' services '+ 'manually'.info + '.\n')
					
					};
					
				};

//FETCH THE BASIC PROJECT DIRECTORY CREATOR
global.framify = require("./framify.js");

//FETCH THE BIXBYTE DRIVIFY APPLICATION OBJECT
global.drivify = function( callback ){
	
				return require("./drivify.js")(callback);
				
			};
		
//!EXPOSE APPLICATION THE LOG STREAM
global.logStream = function(){	return fs.createWriteStream( global.home + "	.framify"); };