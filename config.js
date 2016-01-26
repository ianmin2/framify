require("bixbyte-frame");
global.app.ip = "41.89.162.4";
global.app.drive = "http://" + global.app.ip + "/framify/authfile/drive_auth.json"; 

require("./config_cloud.js");

//!PICK THE CLI VARIABLES
global.repo_name 		= ( process.argv[2] || "-h" ).replace(/ +/g, '_').toLowerCase();
global.create_git 		= process.argv[3];

//GET THE SCRIPT INSTALLATION DIRECTORY
global.home     = path.dirname( fs.realpathSync( __filename ) ) + "/";

//FETCH THE BIXBYTE APPLICATION INFO OBJECT
global.appInfo  = require("./appinfo.js")();
	

//THE BIXBYTE CLOUD INITIALIZER SERVICE
global.cloud_init = function( repo_data ){
	
					if( repo_data.response ){
						
						console.log("@framify".success + "\nInitializing cloud services for the project ".info + global.repo_name + "\n" );
                                            
                        
                        repo_data.data.message.drive();
                        repo_data.data.message.git();
                        
					
					}else{
						
						console.log('@framify\nFailed to initialize cloud services for the project '.err + global.repo_name + '\nYou have to ' + 'set'.info +' the' + ' github '.yell +' and ' +'google drive'.yell + ' services '+ 'manually'.info + '.\n');
					
					};
					
				};

//FETCH THE BASIC PROJECT DIRECTORY CREATOR
global.framify = require("./framify.js")();

//FETCH THE BIXBYTE DRIVIFY APPLICATION OBJECT
//global.drivify = require("./drivify.js");
		
//!EXPOSE APPLICATION THE LOG STREAM
global.logStream = function(){	return fs.createWriteStream( global.home + ".framify"); };