#! /usr/bin/env node

//!LOAD THE APPLICATION CONFIGURATION FILES

app.drive.loadFiles = () => {
 
    return new Promise( (resolve, reject ) => {
          
      if( !fs.existsSync( `${__dirname}/auth/drive_auth.json` ) ){
      
        if( !fs.existsSync( `${__dirname}/auth` ) ){
          
            fs.mkdirSync( `${__dirname}/auth` );
            
        };
      
        var file = fs.createWriteStream( `${__dirname}/auth/drive_auth.json` );
      
        var request = http.get( app.drive.url , (response) => {
                                    
            response.pipe(file);
        
            response.on("end", () => {
                
                resolve("@framify".success + "\nSuccessfully Configured Drive API for first use with this version.\n".yell );
              
            });          
            
            // Add timeout.
            request.setTimeout(12000, function () {
              
                request.abort();
                
                reject("@framify\n".yell + "Cannot initialize the Google drive Parameter".err + "\nPlease ensure that:".info + "\n\tYou are connected to the internet".yell + "\n\tYou are using the latest version of framify\n".yell );
                  
            });
        
        });
      
    }else{
      
      resolve("Using the Pre-configured drive authentication credentials.\n");
      
    };
  
  });
  
};
  
app.drive.Drivify = function( callback ){
    
    //ENSURE THAT THE TOKEN SAVING PATH EXISTS
    if( !fs.existsSync( TOKEN_DIR ) ){       
     
       fse.mkdirRecursiveSync( TOKEN_DIR ); 
    
    };  

  	// Load client secrets from a local file.
    fs.readFile( `${__dirname}/auth/drive_auth.json`, function processClientSecrets(err, content) {
      
      if (err) {
             
        log("\n@framify".yell + '\nError loading the google drive authentication file. \n'.err + err + "\n");
        return;
        
      };
   
        // Authorize a client with the loaded credentials, then call the
        // Drive API.
        authorize(JSON.parse(content), callback );
      
    });
  
      /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     *
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    function authorize(credentials, callback) {
      
        var clientSecret  = credentials.installed.client_secret;
        
        var clientId      = credentials.installed.client_id;
        
        var redirectUrl   = credentials.installed.redirect_uris[0];
        
        var auth          = new googleAuth();
        
        var oauth2Client  = new auth.OAuth2(clientId, clientSecret, redirectUrl);
      
        // Check if we have previously stored a token.
        fs.readFile( TOKEN_PATH, (err, token) => {
          
          if (err) {
            
            getNewToken(oauth2Client, callback);
          } else {
            oauth2Client.credentials = JSON.parse(token);
            callback(oauth2Client);
          }
          
        });
        
     }
     
     
     /**
       * Get and store new token after prompting for user authorization, and then
       * execute the given callback with the authorized OAuth2 client.
       *
       * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
       * @param {getEventsCallback} callback The callback to call with the authorized
       *     client.
       */
      function getNewToken( oauth2Client, callback ) {
        
          var authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
          });
        
          log("@framify".yell + '\nAuthorize this app by visiting this url: '.info, authUrl);
          
          var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });
          
          rl.question("\n@framify".yell + '\nEnter the code from that page here: ', (code) => {
            
            rl.close();
            
            oauth2Client.getToken(code, function(err, token) {
              
              if (err) {
                log("\n@framify".err + '\nError while trying to retrieve google drive access token\n'.err, err);
                return;
              }
              
              oauth2Client.credentials = token;
              storeToken(token);
              callback(oauth2Client);
              
            });
          });
      }
      
      /**
       * Store token to disk be used in later program executions.
       *
       * @param {Object} token The token to store to disk.
       */
      function storeToken(token) {
        
          try {
            fs.mkdirSync(TOKEN_DIR);
          } catch (err) {
            if (err.code != 'EEXIST') {
              throw err;
            }
          }
          fs.writeFile(TOKEN_PATH, JSON.stringify(token));
          
          log("\n@framify".yell +'\nGoogle drive token stored to '.success + TOKEN_PATH + "\n");
          
      } 
      

}


module.exports = function( callback ){
    
    return app.drive.loadFiles()
    .then(function(data){
      
        log("\nSUCCESS:\n");
        log(data);
        return new app.drive.Drivify( callback );
        
    })
    .catch(function(data){
      
      log("\nERROR:\n");
      log(data);
      
    });
    
};