var Log = function ( log_path, dev ){
	
	log_path = log_path || "bixbyte/logs/main.log";
	dev 	 = dev || true;
	
	var fs = require('fs');
	
	//LOG FILE INITIALIZER
	var log_init = function(){
		
		var count;
		var log_dest = log_path.split("/");
		log_dest.pop();
		
		var currpath = "";
		for( count = 0; count < log_dest.length; count++ ){
			
			currpath += log_dest[count] +"/";
			
			if( !fs.existsSync( currpath) ){
				
				fs.mkdirSync( currpath );
				//console.log( "creating directory " + currpath );
				
			}else{
				//console.log("\n\nFAILED TO CREATE THE DIRECTORY '" + currpath + "'\nPlease ensure:\n\t -> It does not already exist \n\t -> You have permission to modify the current folder.");
			}		
					
		}	
		
	}; 
	
	
	//CREATE AN EVENT LOGGER FOR DEBBUGING PURPOSES
	var ls;
	var set_log = function() {
		
		if( fs.existsSync( log_path.split("/n")[0] ) ){
		    ls = fs.createWriteStream( log_path , {flags: 'a'});
		}else{
		    log_init();
		    ls = fs.createWriteStream( log_path , {flags: 'a'}); 
		}
		
	};
    set_log();
	
	//THE SYSTEM EVENT LOGGER 
	this.log = function( logMessage , term ){
	    
		if( ls === undefined  ){ 
			set_log();
		}
			
	    var d = new Date();
	    d = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
	    ls.write( d + "\t" + logMessage + " @!##\n\n");
	    
	    if( term == true || dev == true ){
	        console.log( d + "\t" + logMessage + " \n" );
	    }
		
	};

};

module.exports = function( log_path, dev ){
				return new Log( log_path, dev ).log;	 
			};