//EXPOSE THE BASIC APPLICATION INFO
function AppInfo( ){
	
		var data = json(fs.readFileSync( `${__dirname}/../package.json` ).toString('utf8') );
	
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
		this.website 		= "\n\nWebsite: \t\t".info + data.website;
		
		//application email
		this.email 			= "\n\nSupport email: \t\t".info + data.email;
		
		//application info 
		this.info 			= `${this.name}
							  ${this.version}
							  ${this.description}
							  ${this.author}
							  ${this.website}
							  ${this.email}`;
		
};

module.exports = ( ) => {
	
	return new AppInfo();
	
};