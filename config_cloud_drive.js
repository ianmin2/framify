//THE GOOGLE DRIVE PROJECT BACKUP INITIATOR
global.init_drive = function( ){
	
    log("Initializing Google Drive Services".info);
    
    var driveData = function( auth_data ){
        
        //initialize a google drive repository
	    log("Google Drive authentication complete.\n".success );
        
    };
    
    require("./drivify.js")(driveData);
	
};