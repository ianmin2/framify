#! /usr/bin/env node

var fs   	= require("fs");
var config	= require("./config.js");
var home 	= config.home;
var log  	= config.log;
var framify = config.framify;
var info 	= config.appinfo;
var drivify 	= config.drivify;

var repo_name 	= ( process.argv[2] || "-h" ).replace(/ +/g, '_').toLowerCase();
var create_git 	= process.argv[2];

if( create_git == "" || create_git == undefined || create_git == null ){
	
	
	
}


//THE NEW PROJECT INITIALIZER
var init_repo = function( repo_name, drivecb, gitcb ){
	
	//initialize the directory structure
	framify( repo_name, drivecb, gitcb );
	
};

//THE GOOGLE DRIVE PROJECT BACKUP INITIATOR
var init_drive = function( auth_data ){
	
	//initialize a google drive repository
	console.log("Drivify returned auth data:\n".success + JSON.stringify( auth_data ) );
	
};

//THE GITHUB PROJECT REPOSITORY INITIATOR
var init_git = function(){

	console.log("The git method is yet to be initialized.");
	
};

//HANDLE  A CLI CALL TO ACTION
switch (repo_name ) {
	
	//HANDLE A CALL FOR VERSION INFORMATION
	case "-i":
	case "--info":
		
		console.log( info.info );
		
	break;

	//SHOW THE PRODUCT HELP INFORMATION
	case "-h":
	case "--help":
	
		var hlp = info.name + info.version + info.description;
		console.log( hlp );
			
	break;

	//INITIATE A PROJECT
	default:
		
		init_repo( repo_name, init_drive, init_git );
		
	
	break;
}

//log( repo_name );



/*
var exec = require('child_process').exec;

var e = exec( " cd " + home + " && chmod u+x *.bash && ./git-create.bash", function(err, stdout, stderr){
	if( err ){
		console.log( "\n\nError: " + err.message );
	}else{
		console.log( "\n\n" + stdout );
	}
});

console.log("\n\n\tSTARTING BIXBYTE FRAMIFY\n\n\t");


fs.mkdir("Framify Test", function(err){
	if(!err){
		console.log("\n\nSuccessfully created directory");
	}else{
		console.log("\n\nFaced An error while trying to initialize the project\nPlease ensure that no such directory exists.");
	}
});
*/
