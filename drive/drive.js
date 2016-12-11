app.drive.url = `http://${app.ip}/framify/authfile/drive_auth.json`;

app.drive.init = () => {
	
	log("Initializing the Google Drive service.");
	
	var initializeDrive = ( auth_data ) => {
		
		//==> INIT A DRIVE FOLDER
		log("@framify".yell + "\nGoogle Drive authentication complete.\n".success );
		
		//!Running a test function
                app.drive.listFiles = app.drive.listFiles.bind( this );
		app.drive.listFiles();
		
	};
	
	
	app.drive.listFiles = ( fileLimit ) => {
		
		fileLimit = fileLimit || 10 ;
		
		/**
                * Lists the names and IDs of up to 10 files.
                *
                * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
                */
        
                var service = google.drive('v2');
        
                service.files.list({
                auth: this.auth_data,
                maxResults: fileLimit,
                }, (err, response) => {
                                
                        if (err) {
                                                
                                log('The API returned an error: ' + err);
                                return;
                                                
                        }
                                        
                        var files = response.items;
                                        
                        if (files.length == 0) {
                                                
                                log('You have no files on your drive.');
                                                
                        } else {
                                                
                                console.log('\n@framify\n'.info + 'Files on your google drive:'.success);
                                                
                                files.forEach( (fileData) => {
                                        log( `${fileData.title} \t\t=> id: ${fileData.id}` );
                                });
                                        
                        }
                                
                });
		
		
	};
	
	//!Run the drive setup
	require("./drivify.js")(initializeDrive);
	
};