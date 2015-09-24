//EXPOSE THE BASIC APPLICATION INFO
function AppHelp( fs, home, c ){
	
		fs 		= fs || require("fs");
		home 	= home + "/" || ( require('path').dirname( fs.realpathSync( __filename ) ) + "/" );
		c 		= c || require("colors").setTheme({ success:'green', err:'red', info:'blue', gray:'gray', yell:'yellow'});
		
		var data = JSON.parse(fs.readFileSync(home + "package.json") );
	
		//application name
		this.name 			= "\n\nApplication: ".info +"\t\tBixbyte Framify".yell;
		
		//application garbage collector					  
		this.gc 			= function(){
											data = null;	delete data;
											fs = null;		delete fs;
											c = null;		delete c;
										};
};

module.exports = function( fs, home, c ){
	
	return new AppHelp( fs, home, c );
	
};