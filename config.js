//@BASIC PROJECT REQUIREMENTS
require("bixbyte-frame");


//@PROJECT SPECIFIC IMPORTS
global.wrench = require("wrench");

//** GOOGLE MODULES **/    
global.google 	            = require('googleapis');
global.googleAuth 	        = require('google-auth-library');

//** GOOGLE DRIVE CONFIGURATION
global.SCOPES 	            = ['https://www.googleapis.com/auth/drive'];
global.TOKEN_DIR 	        = path.join( global.home ,'.bixbyte/.framify/');
global.TOKEN_PATH 	        = TOKEN_DIR + 'auth.json';

//# BASIC DRIVE AUTHENTICATION CONFIG FILE SETUP
app.ip = "41.89.162.4";

//# FETCH THE BASIC CLOUD APP CONFIGURATIONS
require("./cloud_config.js");

//# FETCH THE CLI APP VARIABLES
app.vars.repository =   ( process.argv[2] || "-h" ).replace(/ +/g, '_').toLowerCase();
app.vars.git 		=	 process.argv[3] || null;

//# FETCH THE SCRIPT INSTALLATION DIRECTORY
app.vars.home 		= 	path.dirname( fs.realpathSync( __filename ) ) + '/';

//FETCH THE APPLICATION INFO OBJECT
app.vars.appInfo 	= require("./basics/appinfo.js")();
global.appInfo 		= app.vars.appInfo;

//# FETCH THE BASIC PROJECT DIRECTORY CREATOR
global.Framify 		= require("./framify.js")();

//# SINCE THE DRIVIFY OBJECT REQUIRES AN ACTIVE CALLBACK( oAuth_client ), IT SHOULD BE STORED BEFORE USE 
global.Drivify 		= require("./drive/drivify.js");

// //#EXPOSE THE APPLICATION LOG STREAM 
// global.logStream = () => {
// 	return fs.createWriteStream( `${app.vars.home}.framify` );
// };

//# CLOUD INITIALIZATION FUNCTION
app.cloud.init = ( repoData ) => {

	if( repoData.response ){
		
		console.log("@framify".success + "\nInitializing cloud services for the project ".info + app.vars.repository + "\n" );
		repoData.data.message.drive();
		repoData.data.message.git();
		
	}else{
		
		console.log('@framify\nFailed to initialize cloud services for the project '.err + app.vars.repository + '\nYou have to ' + 'set'.info +' the' + ' github '.yell +' and ' +'google drive'.yell + ' services '+ 'manually'.info + '.\n');
		
	}	
	
};