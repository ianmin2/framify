//EXPOSE THE BASIC APPLICATION INFO
function AppInfo( fs, home, c ){
	
		fs 		= fs || require("fs");
		home 	= home + "/" || ( require('path').dirname( fs.realpathSync( __filename ) ) + "/" );
		c 		= c || require("colors").setTheme({ success:'green', err:'red', info:'blue', gray:'gray', yell:'yellow'});
		
		var data = JSON.parse(fs.readFileSync(home + "package.json") );
	
		//console.log( typeof(data) );

		//application name
		this.name 			= "\n\nApplication: ".info +"\t\tBixbyte Framify".yell;
		
		//application version
		this.version 		= "\n\nVersion: \t\t".info + data.version;
		
		//application description
		this.description 	= "\n\nDescription: \t\t".info + data.description;
		
		//application author
		this.author 		= "\n\nAuthor: \t\t".info + data.author;
		
		//application website 
		this.website 		= "\n\nWebsite: \t\t".info + data.website.toString().yell;
		
		//application email
		this.email 			= "\n\nSupport email: \t\t".info + data.email.toString().yell;
		
		//application info 
		this.info 			= this.name
							  + "" + this.version
							  + "" + this.description
							  + "" + this.author
							  + "" + this.website
							  + "" + this.email;
							  
		//applivation help portal
		this.help			=  require("./apphelp.js")(fs,home,c);
		this.help.gc();
		
		//application garbage collector					  
		this.gc 			= function(){
											data = null;	delete data;
											fs = null;		delete fs;
											c = null;		delete c;
										};
	
};

module.exports = function( fs, home, c ){
	
	return new AppInfo( fs, home, c );
	
};
