//THE GOOGLE DRIVE PROJECT BACKUP INITIATOR
global.init_drive = function( ){
	
    log("Initializing Google Drive Services".info);
    
    var driveData = function( auth_data ){
        
        //initialize a google drive repository
	    log("@framify".yell + "\nGoogle Drive authentication complete.\n".success );
        
        

        /**
        * Lists the names and IDs of up to 10 files.
        *
        * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
        */
        
        var service = google.drive('v2');
        
        service.files.list({
            auth: auth_data,
            maxResults: 1000,
        }, function(err, response) {
            if (err) {
                log('The API returned an error: ' + err);
            return;
            }
            var files = response.items;
            if (files.length == 0) {
                log('No files found.');
            } else {
                log('\n@framify\n'.info + 'Files:'.success);
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                log('%s (%s)', file.title, file.id);
            }
            }
        });   
        
    };
    
    require("./drivify.js")(driveData);
	
};