#! /usr/bin/env node

require("./config.js");


//@ CREATE  A NEW REPOSITORY
var instantiate_repo = ( repoName ) => {
	Framify( repoName );
};

//@ HANDLE ACTION ACCORDING TO THE CLI VARIABLES PASSED 
switch( app.vars.repository ){
	
	//#APP INFO
	case "-i":
    case "--i":
    case "-info":
	case "--info":

		console.dir( appInfo.info );

	break;
	
	//#APP VERSION
    case "-v":
    case "--v":
    case "-version":
	 case "--version":
        console.log( "\n@framify".yell + appInfo.version + "\n"  )
    break;
	
	//#APP HELP
	case "-h":
    case "--h":
	case "-help":
	case "--help":

		var hlp = appInfo.name + appInfo.version + appInfo.description;
		console.log( hlp );

	break;
	
	//#APP INSTANTIATION
	default: 
		
		app.vars.repository = app.vars.repository.replace(/\-/g, "");
		instantiate_repo( app.vars.repository );
		
	break;
	
}