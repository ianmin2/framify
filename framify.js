var Framify = function(){

	//WRENCH COPY CONFIGURATION
	var copy_config = {
						forceDelete: 		false,	//force file deletion
						excludeHiddenUnix: 	true,	//exclude hidden *nix files
						preserveFiles: 		true,	//preserve already existing files
						preserveTimestamps: true,	//Keep the original file timestamps
						inflateSymlinks: 	true,	//Translate symbolic links into files
						//exclude: 			/\.(*~|git)$/i		//Exclusion filter ( regex || function )
						//filter: 			"",   	//Filter against an expression such that if( filter == true ){ do nothing; }
						//whitelist: 			false,	//if( whitelist == true && ( filter != true ) ) { ignore file }
						//include: 			"",		//Include filter ( regex || function )						
				  };

	//!THE BASIC DIRECTORY STRUCTURE CREATOR
	this.mkdirs = function ( homedir ){
		
		homedir = ( homedir || "framify\ test\ \/app" ).replace(/ +/g, '_').toLowerCase();
		
		homedir = ( homedir || "framify\ test\ \/app" ).replace(/ +/g, '_').toLowerCase();
		
		//# ONLY CREATE A DIRECTORY WHERE NECESSARY 	
		fs.exists( homedir, function name(exists) {
					         
			if(!exists){				
				//INITIALIZE  THE PROJECT DIRECTORY IF NOT EXISTS ALREADY
				mkdir(homedir);				
			}else{
				//INFORM THE USER THAT THE DIRECTORY ALREADY EXISTS 
				console.log("@framify\n".err + "Failed to initialize project: ".err + "A directory by that name already exists in the current path.\n" + "Please try another".info + "\n");				
			};
            
		});
		
		//# THE ACTUAL DIRECTORY CREATION EVALUATOR
		var mkdir = function (homedir){
			
			console.log("@framify\n".success + "Initializing Project ".info + homedir + "\n");
			
			//# FILE SOURCES		
				this.fromFiles 	= 	{ 			
										main: 		[ __dirname, "assets" ]
									};
				
				//# FILE DESTINATIONS	
				this.toFiles 	=   {			
										main: 		[ homedir ]
									};
								
				//# COPY THE FILES RECCURSIVELY IF SIMILAR KEYS EXIST
				this.fromFiles.foreach( (fileValue, fileKey) => {
					
					//console.log( `${fileValue} ++> ${fileKey}` )
					
					//# COPY FROM ++> TO
					if( this.toFiles.hasOwnProperty( fileKey ) ){
							
						var from = this.fromFiles[fileKey].join().replace(/,/g, "/").replace(/\/\//g, "/").toString("utf8");
						var to 	 = this.toFiles[fileKey].join().replace(/,/g, "/").replace( /\/\//g, "/").toString("utf8");
						
						console.log( `Copying initialization files ${from} ++> ${to}` )
											
						doFiles( from , to );
						
					}
					
				});
			
			
		};
		
		//@ SUCCESSFUL DIRECTORY EVALUATOR
		var evaluateCopy = (err) =>{
				
								if(err){
									
									console.log("@framify\n".err + "Failed \t" + err.message + "\n");
									app.cloud.init( { response: false, data: { message: app.cloud.callbacks, command: '' } });
									
								}else{
									
									console.log("@framify\n".success + "initialized \t".info +  this.toPath + "\n" );
									app.cloud.init( { response: true, data: { message: app.cloud.callbacks, command: '' }});
									
								}
								
							};
		
		//# COPY THE FILES TO THE REQUIRED DIRECTORY [ `${app.vars.home}/${app.vars.repository}` ]
		var doFiles = function(  fromPath, toPath ){
		
			//fse.copyRecursive( fromPath, toPath, evaluateCopy );
			//wrench.mkdirSyncRecursive(toPath[0], 0777);
			evaluateCopy = evaluateCopy.bind( this );
			wrench.copyDirRecursive(fromPath , toPath, copy_config, evaluateCopy );
			
			
		};		
		
	};
	
};

//# EXPOSE THE PROJECT INITIATOR 
module.exports = () => {
	return new Framify().mkdirs;
};