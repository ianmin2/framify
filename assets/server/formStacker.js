require("bixbyte-frame");

var jsonTest = (/\.(json)$/i);

var formNameTest = (/[^\.]*/i);

var formPath  = __dirname + "/../forms/";

var distPath = formPath + "dist/";

var packIntoOne = function(){
	
	return new Promise(function(resolve,reject){
	
		var jsonFilePaths = [];
		
		var formNames = [];
		
		var completeFormObject = {};
	
		var allFilesInPath = fs.readdirSync( formPath );
		
		if(allFilesInPath[0]){
			
			allFilesInPath.forEach(function(fileInPath){
				
				if(jsonTest.test(fileInPath)){					
					jsonFilePaths.push( formPath + "" + fileInPath);
					formNames.push( fileInPath.match( formNameTest )[0] );					
				}
				
			});
			
			for(var pos = 0; pos < jsonFilePaths.length; pos++ ){
				
				completeFormObject[formNames[pos]] = JSON.parse( fs.readFileSync( jsonFilePaths[pos] ).toString('utf8') );
				
			}
								
			if( !fs.existsSync( distPath ) ){ fs.mkdirSync( distPath ); }
			
			fs.writeFileSync( distPath + "mainForm.json", JSON.stringify(completeFormObject) );
			
			var len = jsonFilePaths.length;
			var cur = 0;
			
			jsonFilePaths.forEach(function(jsonFilePath){
				fs.unlinkSync(jsonFilePath);
				cur++;
				log("Deleted file ".yell + cur + " of ".yell + len );
			});	
			
			jsonFilePaths = null;
			formNames = null;
			allFilesInPath = null;
			len = null;
			cur = null;
			
			resolve( "mainForm.json schema file successfully written in forms/dist." );	
			
		}else{
			
			reject("Failed to capure any file to process");
			
		}
		
	});	

};

module.exports = function(){
	return new packIntoOne;
}

// packIntoOne()
// .then(function(d){
// 	console.dir(d);
// })
// .catch(function(e){
// 	console.dir(e)
// })
// .then(function(){
// 	log("DONE!!".info)
// })