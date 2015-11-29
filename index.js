#! /usr/bin/env node

require("./config.js");

if( create_git == "" || create_git == undefined || create_git == null ){
	
	console.log("@framify\n".info + "Skipping over github repo creation\n".err );
		
}else{
    
    init_git();
    
};


//THE NEW PROJECT INITIALIZER
var init_repo = function( repo_name ){
	
	//initialize the directory structure
	framify( repo_name );
	
};

//HANDLE  A CLI CALL TO ACTION
switch (repo_name ) {
	
	//HANDLE A CALL FOR VERSION appInfoRMATION
	case "-i":
	case "--appInfo":
		
		log( appInfo.appInfo );
		
	break;

	//SHOW THE PRODUCT HELP appInfoRMATION
	case "-h":
	case "--help":
	
		var hlp = appInfo.name + appInfo.version + appInfo.description;
		log( hlp );
			
	break;

	//INITIATE A PROJECT
	default:
		
		init_repo( repo_name );
		
	
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